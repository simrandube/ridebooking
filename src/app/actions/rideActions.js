"use server";

import { createClientInstance } from "@/lib/supabase/server";

export async function bookRide(formData) {
  const supabase = createClientInstance();

  const { error } = await supabase.from("rides").insert([
    {
      user_name: formData.get("name"),
      user_email: formData.get("email"),
      pickup: formData.get("pickup"),
      drop_location: formData.get("drop"),
      ride_date: formData.get("ride_date"),
      vehicle_type: formData.get("vehicle_type"),
      status: "pending",
    },
  ]);

  if (error) {
    console.error("Supabase Error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
