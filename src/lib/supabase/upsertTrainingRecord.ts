import { supabase } from ".";
import { SUPABASE } from "../../config/supabase";

export async function upsertTrainingRecord(record) {
  const { data, error } = await supabase
    .from(SUPABASE.tables.training_pairs)
    .upsert(record)
    .select();

  if (error) console.error("error upsertTrainingRecord", error);
}
