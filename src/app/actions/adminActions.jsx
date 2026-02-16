"use server";

import { createClientInstance } from "@/lib/supabase/server";

export async function updateRideStatus(id, status) {
  const supabase = createClientInstance();

  const { error } = await supabase
    .from("rides")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error(error);
    return { success: false };
  }

  return { success: true };
}
