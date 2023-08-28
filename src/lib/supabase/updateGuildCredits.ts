import { supabase } from ".";
import { SUPABASE } from "../../config/supabase";

export async function updateGuildCredits(gId, amount) {
  const { data, error } = await supabase
    .from(SUPABASE.tables.guild_credits)
    .upsert({ id: gId, credits: amount })
    .select();

  if (error) console.error("error updateGuildCredits", error);
  // @ts-ignore
  if (data) return data.credits;
  return undefined;
}
