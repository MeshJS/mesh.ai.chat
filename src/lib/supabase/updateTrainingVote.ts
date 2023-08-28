import { supabase } from ".";
import { SUPABASE } from "../../config/supabase";

export async function updateTrainingVote(messageId, vote) {
  const { error } = await supabase
    .from(SUPABASE.tables.training_pairs)
    .update({ v: vote })
    .eq("id", messageId);

  if (error) console.error("error updateTrainingVote", error);
}
