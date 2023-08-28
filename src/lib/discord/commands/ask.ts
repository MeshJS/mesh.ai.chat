import { createCompletion } from "../../../lib/openai/createCompletion";
import { SlashCommandBuilder } from "discord.js";
import { googleQuery } from "../../../lib/google";
import { reportMeshChannel } from "../utils/reportMeshChannel";
import { discord_is_production, limitQuestionLength } from "../../../config";
import { getRecordsByFTS } from "../../../lib/supabase/getRecordsByFTS";
import { getGuildCredits } from "../../../lib/supabase/getGuildCredits";
import { updateGuildCredits } from "../../../lib/supabase/updateGuildCredits";
import { newEmbedMessage } from "../common/newEmbedMessage";
import Fuse from "fuse.js";

const slashCommandDescription = discord_is_production()
  ? "Ask Mesh AI a question!"
  : "Ask Mesh AI (dev) a question!";

export const CommandPromptAsk = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription(slashCommandDescription)
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("enter your question")
        .setRequired(true)
        .setMaxLength(limitQuestionLength)
    ),
  async execute(interaction) {
    await execute(interaction);
  },
};

async function execute(interaction) {
  try {
    let allowAsk = false;

    /**
     * CREDIT
     */
    const guildCredit = await getGuildCredits(interaction.guildId);
    if (guildCredit === undefined) {
      await interaction.reply("Need to `!initmesh` first!");
    } else if (guildCredit == 0)
      await interaction.reply("Need to top up more credits.");
    else {
      await updateGuildCredits(interaction.guildId, guildCredit - 1);
      allowAsk = true;
    }

    if (allowAsk) {
      /**
       * START PROMPT
       */

      let prompt = interaction.options.getString("prompt") ?? undefined;

      const embedMessage = newEmbedMessage();
      embedMessage.addFields({ name: "Your Question:", value: prompt });

      await interaction.reply({ embeds: [embedMessage] });

      if (prompt === undefined) {
        await interaction.editReply(`Need a prompt!`);
      } else {
        /**
         * get data
         */
        const _responseGoogle = await googleQuery(prompt);
        let responseGoogle: {
          q: string;
          a: string;
        }[] = [];
        for (var i in _responseGoogle) {
          responseGoogle.push({
            q: _responseGoogle[i].title,
            a: _responseGoogle[i].description,
          });
        }

        const responseDatabase = await getRecordsByFTS(prompt);

        const allData = [...responseDatabase, ...responseGoogle];

        /**
         * fuse
         */

        const options = {
          includeScore: true,
          keys: [
            {
              name: "q",
              weight: 0.7,
            },
            {
              name: "a",
              weight: 0.3,
            },
          ],
          ignoreLocation: true,
          shouldSort: true,
        };

        const fuse = new Fuse(allData, options);

        const sources_sorted = fuse.search(prompt);

        let sources = sources_sorted.map((source) => {
          return source.item;
        });
        sources = sources.slice(0, 20);

        const responseOpenai = await createCompletion(
          prompt,
          //@ts-ignore
          sources
        );

        const embedMessage = newEmbedMessage();
        embedMessage.addFields({ name: "Your Question:", value: prompt });

        // open ai
        let responseOpenaiMessage: string | undefined = undefined;

        if (responseOpenai?.success) {
          //@ts-ignore
          responseOpenaiMessage = responseOpenai.data;
          if (responseOpenaiMessage) {
            embedMessage.addFields({
              name: "Mesh AI:",
              value: responseOpenaiMessage,
            });
          }
        }

        // google
        if (responseGoogle.length > 0 && responseOpenaiMessage === undefined) {
          responseOpenaiMessage =
            "Not sure, if someone knows the answer could reply to this message to add to the knowledge base.";

          embedMessage.addFields({
            name: "Mesh AI:",
            value: responseOpenaiMessage,
          });
        }

        try {
          await interaction.editReply({ embeds: [embedMessage] });

          let reportMessage = `New response to /ask\n`;
          reportMessage += `**Prompt** - ${prompt}\n`;
          reportMessage += `**Generated** - ${responseOpenaiMessage}\n`;
          reportMessage += `**Meta** - G: ${interaction.guildId} | C: ${interaction.channelId} | U: ${interaction.user.id} | UN: ${interaction.user.username}${interaction.user.discriminator}`;
          if (discord_is_production()) {
            await reportMeshChannel({
              client: interaction.client,
              message: reportMessage,
            });
          }
        } catch (error) {
          console.error("ERROR at ask", error);
          if (discord_is_production()) {
            let reportMessage = `Error\n`;
            reportMessage += `**Prompt** - ${prompt}\n`;
            reportMessage += `**Error** - ${error}\n`;
            await reportMeshChannel({
              client: interaction.client,
              message: reportMessage,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("ERROR at ask", error);
    if (discord_is_production()) {
      let reportMessage = `Error\n`;
      reportMessage += `**Prompt** - ${prompt}\n`;
      reportMessage += `**Error** - ${error}\n`;
      await reportMeshChannel({
        client: interaction.client,
        message: reportMessage,
      });
    }
  }
}
