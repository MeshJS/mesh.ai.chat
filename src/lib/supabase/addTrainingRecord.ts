import { supabase } from ".";
import { SUPABASE } from "../../config/supabase";

export async function addTrainingRecord(record) {
  const { error } = await supabase
    .from(SUPABASE.tables.training_pairs)
    .insert(record);

  if (error) console.error("error addTrainingRecord", error);
}
