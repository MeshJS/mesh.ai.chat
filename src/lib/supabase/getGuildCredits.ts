import { supabase } from ".";
import { SUPABASE } from "../../config/supabase";

export async function getGuildCredits(gId) {
  const { data, error } = await supabase
    .from(SUPABASE.tables.guild_credits)
    .select()
    .eq("id", gId);

  if (error) console.error("error getGuildCredits", error);
  // @ts-ignore
  if (data?.length==1) return data[0].credits;
  return undefined;
}
