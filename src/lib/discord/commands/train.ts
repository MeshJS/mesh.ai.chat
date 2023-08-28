import { SlashCommandBuilder } from "discord.js";
import {
  discord_is_production,
  limitAnswerLength,
  limitQuestionLength,
} from "../../../config";
import { addTrainingRecord } from "../../../lib/supabase/addTrainingRecord";
import { TrainingPairs } from "../../../types/trainingPairs";
import { newEmbedMessage } from "../common/newEmbedMessage";

const slashCommandDescription = discord_is_production()
  ? "Add a training data!"
  : "Add a training data! (dev)";

export const CommandPromptTrain = {
  data: new SlashCommandBuilder()
    .setName("train")
    .setDescription(slashCommandDescription)
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("enter your question")
        .setRequired(true)
        .setMaxLength(limitQuestionLength)
    )
    .addStringOption((option) =>
      option
        .setName("answer")
        .setDescription("enter your answer")
        .setRequired(true)
        .setMaxLength(limitAnswerLength)
    ),
  async execute(interaction) {
    await execute(interaction);
  },
};

async function execute(interaction) {
  try {
    const question = interaction.options.getString("question") ?? undefined;
    const answer = interaction.options.getString("answer") ?? undefined;

    const embedMessage = newEmbedMessage();

    embedMessage.addFields({ name: "Question:", value: question });
    embedMessage.addFields({ name: "Answer:", value: answer });

    await interaction.reply({ embeds: [embedMessage] });

    let newTrainingPair: Partial<TrainingPairs> = {
      id: new Date().valueOf().toString(),
      q: question,
      a: answer,
      v: 0,
      gId: interaction.guildId,
      now: new Date(),
    };

    await addTrainingRecord(newTrainingPair);
  } catch (error) {}
}
