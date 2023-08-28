import { TrainingPairs } from "../../../types/trainingPairs";
import { negativeEmojis, positiveEmojis } from "../../../config/emojis";
import { upsertTrainingRecord } from "../../../lib/supabase/upsertTrainingRecord";
import { limitAnswerLength, limitQuestionLength } from "../../../config/index";

export default async function MessageReactionAdd({ client, reaction, user }) {
  if (user == client.user) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      return;
    }
  }

  // // Now the message has been cached and is fully available
  // console.log(
  //   `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
  // );
  // // The reaction is now also fully available and the properties will be reflected accurately:
  // console.log(
  //   `${reaction.count} user(s) have given the same reaction to this message!`
  // );

  // let score = 0;

  // reaction.message.reactions.cache.forEach(async (reaction) => {
  //   const emojiName = reaction._emoji.name;
  //   // const emojiCount = reaction.count;

  //   if (positiveEmojis.includes(emojiName)) {
  //     score += 1;
  //   }
  //   if (negativeEmojis.includes(emojiName)) {
  //     score -= 1;
  //   }
  // });

  // update database

  // let updatedTrainingPair: Partial<TrainingPairs> = {
  //   id: reaction.message.id,
  //   v: score,
  // };

  // // const db = await getDatabase();
  // // const collection = db.collection(MONGODB.collections.training_pairs);

  // // let _ = await collection.updateOne(
  // //   { id: updatedTrainingPair.id },
  // //   { $set: updatedTrainingPair }
  // // );

  // await updateTrainingVote(updatedTrainingPair.id, updatedTrainingPair.v);

  // if reaction to bot's generated message

  try {
    if (client.user == reaction.message.mentions.repliedUser) {
      const message = reaction.message;

      const { messageId } = message.reference;
      const repliedMessage = await message.channel.messages.fetch(messageId);

      if (!repliedMessage) return;

      const embedMessage = repliedMessage.embeds[0];
      if (!embedMessage) return;

      const questionText = embedMessage.data.fields![0].value;

      const score = CountReactions(reaction, true);

      // update database

      const content = message.content.substring(0, limitAnswerLength);

      let trainingPair: TrainingPairs = {
        id: message.id,
        q: questionText,
        a: content,
        v: score,
        gId: message.guildId,
        rId: repliedMessage.id,
        now: new Date(),
      };

      await upsertTrainingRecord(trainingPair);
    }
    // react to user's message
    else {
      const message = reaction.message;

      // check if this message is a reply to another message
      if (reaction.message.reference) {
        const { messageId } = message.reference;
        const repliedMessage = await message.channel.messages.fetch(messageId);

        const content = message.content.substring(0, limitAnswerLength);
        const repliedMessageContent = repliedMessage.content.substring(
          0,
          limitQuestionLength
        );

        message.react("👍");

        let score = CountReactions(reaction);

        // update database

        let trainingPair: TrainingPairs = {
          id: message.id,
          q: repliedMessageContent,
          a: content,
          v: score,
          gId: message.guildId,
          rId: repliedMessage.id,
          now: new Date(),
        };

        await upsertTrainingRecord(trainingPair);
      }
    }
  } catch (error) {
    console.error("MessageReactionAdd", error);
    return;
  }
}

function CountReactions(reaction, reduceOne = false) {
  // count votes
  let score = 0;
  reaction.message.reactions.cache.forEach(async (reaction) => {
    const emojiName = reaction._emoji.name;

    if (positiveEmojis.includes(emojiName)) {
      let thisCount = reaction.count;
      if (emojiName == "👍") {
        thisCount -= 1;
      }
      score += thisCount;
    }
    if (negativeEmojis.includes(emojiName)) {
      score -= reaction.count;
    }
  });
  return score;
}
