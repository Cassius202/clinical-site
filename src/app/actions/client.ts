'use server'

import { createClient } from "@supabase/supabase-js";

// These are private (Server-only)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function getClients() {
  try {
    const { data, error } = await supabase
      .from("completed_clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    return { success: false, error: error.message };
  }
}