import { SUPABASE } from "../../config/supabase";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE.url, SUPABASE.anon);
