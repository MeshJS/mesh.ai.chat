import { discord_is_production } from "../../../config";
import { SlashCommandBuilder } from "discord.js";
import { newEmbedMessage } from "../common/newEmbedMessage";

const slashCommandDescription = discord_is_production()
  ? "How to use Mesh AI?"
  : "How to use Mesh AI (dev)?";

export const CommandPromptHelp = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(slashCommandDescription),
  async execute(interaction) {
    await execute(interaction);
  },
};

async function execute(interaction) {
  const embedMessage = newEmbedMessage();

  embedMessage
    .addFields({
      name: "What is Mesh AI?",
      value:
        "Mesh AI is a Discord integrated AI to learn knowledge about your community and answer questions in real time.",
    })
    .addFields({
      name: "How to improve Mesh AI responses?",
      value:
        "You can upvote or downvote the AI's response to help it learn. The more upvotes, the more likely it will be used in the future.",
    })
    .addFields({
      name: "How to fine-tune Mesh AI responses?",
      value:
        "You can reply to the AI's response with a better answer. The AI will learn from your response and use it in the future.",
    })
    .addFields({
      name: "Add training data?",
      value:
        "Just use /train and enter a question and answer. The more training data, the better the AI will be.",
    })
    .addFields({
      name: "More help?",
      value:
        "Visit https://ai.meshjs.dev for more information on how to use Mesh AI.",
    });

  await interaction.reply({ embeds: [embedMessage] });
}
