import { Client, Message } from "discord.js";
import { getGuildCredits } from "../../../lib/supabase/getGuildCredits";
import { updateGuildCredits } from "../../../lib/supabase/updateGuildCredits";
import { newEmbedMessage } from "../common/newEmbedMessage";
import { registerSlashCommand } from "../commands/registerSlashCommand";
import { getRecordsByFTS } from "../../../lib/supabase/getRecordsByFTS";
import Fuse from "fuse.js";
import { createCompletion } from "../../../lib/openai/createCompletion";
import { discord_is_production } from "../../../config/index";
import { reportMeshChannel } from "../utils/reportMeshChannel";

export default async function MessageCreate({
  client,
  message,
}: {
  client: Client;
  message: Message;
}) {
  if (message.author == client.user) return;

  if (message.content == "!initmesh") {
    await initmesh(message);
    return;
  }

  const hasAReply = await newMessageCheckDatabase(client, message);
  if (hasAReply) {
    return;
  }
}

async function newMessageCheckDatabase(client, message) {
  try {
    const content = message.content.substring(0, 256);
    const guildId = message.guildId!;

    const responseDatabase = await getRecordsByFTS(content, guildId);

    if (responseDatabase.length == 0) return false;

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

    const fuse = new Fuse(responseDatabase, options);

    const sources_sorted = fuse.search(content);

    const sources_filtered = sources_sorted.filter((source) => {
      //@ts-ignore
      return source.score < 0.01;
    });

    if (sources_filtered.length == 0) return false;

    let sources = sources_filtered.map((source) => {
      return source.item;
    });
    sources = sources.slice(0, 20);

    /**
     * has data that is super relevant
     */

    const responseOpenai = await createCompletion(
      content,
      //@ts-ignore
      sources
    );

    if (responseOpenai?.success) {
      const embedMessage = newEmbedMessage();
      embedMessage.addFields({ name: "Your Question:", value: content });

      embedMessage.addFields({
        name: "Mesh AI:",
        value: responseOpenai.data!,
      });

      message.reply({ embeds: [embedMessage] });

      let reportMessage = `New response to chat\n`;
      reportMessage += `**Prompt** - ${content}\n`;
      reportMessage += `**Generated** - ${responseOpenai.data!}\n`;
      reportMessage += `**Meta** - G: ${message.guildId} | C: ${message.channelId} | U: ${message.user.id} | UN: ${message.user.username}${message.user.discriminator}`;
      if (discord_is_production()) {
        await reportMeshChannel({
          client: client,
          message: reportMessage,
        });
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error("ERROR at newMessageCheckDatabase", error);
  }
  return false;
}

async function initmesh(message) {
  try {
    const guildCredit = await getGuildCredits(message.guildId);
    if (guildCredit === undefined) {
      await updateGuildCredits(message.guildId, 100);
    }

    registerSlashCommand(message.guildId);

    const embedMessage = newEmbedMessage();
    embedMessage
      .setTitle("Mesh AI initialized!")
      .setDescription("Knowledge made accessible on Cardano.")

      .addFields({
        name: "What is Mesh AI?",
        value:
          "Mesh AI is a Discord integrated AI to learn knowledge about your community and answer questions in real time.",
      })
      .addFields({
        name: "Ask questions",
        value: "Type `/ask` to start asking questions.",
      })
      .addFields({ name: "Help?", value: "Type `/help` to learn more!" });

    message.reply({ embeds: [embedMessage] });
  } catch (error) {
    console.error("ERROR at initmesh", error);
  }
}

async function isRepliedMessage(client, message) {
  const { messageId } = message.reference;
  if (messageId) {
    const _repliedMessage = await message.channel.messages.fetch(messageId);
    const _repliedMessageAuthor = _repliedMessage.author;

    // is replying to bot
    if (_repliedMessageAuthor.id == client.user?.id) {
      // const embedMessage = _repliedMessage.embeds[0];
      // const questionText = embedMessage.data.fields![0].value;
      // let newTrainingPair: TrainingPairs = {
      //   id: newMessage.id,
      //   q: questionText,
      //   a: newMessage.content,
      //   v: 0,
      //   gId: guildId,
      //   qId: repliedMessage.id,
      //   aId: newMessage.id,
      //   now: new Date(),
      // };
      // await addTrainingRecord(newTrainingPair);
      // message.react("👍");
    }
    // user reply to user
    else {
      // console.log("user reply to user message", message);
      // let newTrainingPair: TrainingPairs = {
      //   id: newMessage.id,
      //   q: repliedMessage.content,
      //   a: newMessage.content,
      //   v: 0,
      //   gId: guildId,
      //   qId: repliedMessage.id,
      //   aId: newMessage.id,
      //   now: new Date(),
      // };
      // await addTrainingRecord(newTrainingPair);
      // message.react("👍");
    }
  }
}
