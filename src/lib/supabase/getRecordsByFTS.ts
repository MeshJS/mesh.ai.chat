import { supabase } from ".";
import { SUPABASE } from "../../config/supabase";

export async function getRecordsByFTS(query, gId = undefined) {
  query = query.toLowerCase();
  var regexPattern = /[^A-Za-z]/g;
  query = query.replace(regexPattern, " ");
  query = query.replace(/\s+/g, " ").trim();
  query = query.trim();
  query = query.split(" ").join("|");

  if (gId) {
    const { data, error } = await supabase
      .from(SUPABASE.tables.training_pairs)
      .select("q, a, gId")
      .eq("gId", gId)
      .gte("v", 0)
      .textSearch("fts", query)
      .order("v", { ascending: false });
    if (error) console.error("error getRecordsByFTS", error);
    if (data) return data;
  } else {
    const { data, error } = await supabase
      .from(SUPABASE.tables.training_pairs)
      .select("q, a, gId")
      .gte("v", 0)
      .textSearch("fts", query)
      .order("v", { ascending: false });
    // .limit(SUPABASE.queryLimit);

    if (error) console.error("error getRecordsByFTS", error);
    if (data) return data;
  }

  return [];
}

// export async function getRecordsByFTS(query, gId, equal_gId = true) {
//   query = query.toLowerCase();
//   var regexPattern = /[^A-Za-z]/g;
//   query = query.replace(regexPattern, " ");
//   query = query.replace(/\s+/g, " ").trim();
//   query = query.trim();
//   query = query.split(" ").join("|");

//   if (equal_gId) {
//     const { data, error } = await supabase
//       .from(SUPABASE.tables.training_pairs)
//       .select("q, a")
//       .gte("v", 0)
//       .eq("gId", gId)
//       .textSearch("fts", query)
//       .order("v", { ascending: false })
//       .limit(SUPABASE.queryLimit);

//     if (error) console.error("error getRecordsByFTS", error);
//     if (data) return data;
//   } else {
//     const { data, error } = await supabase
//       .from(SUPABASE.tables.training_pairs)
//       .select("q, a")
//       .gte("v", 0)
//       .neq("gId", gId)
//       .textSearch("fts", query)
//       .order("v", { ascending: false })
//       .limit(SUPABASE.queryLimit);

//     if (error) console.error("error getRecordsByFTS", error);
//     if (data) return data;
//   }

//   return [];
// }
