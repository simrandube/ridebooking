
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CheckStatus() {
  const [email, setEmail] = useState("");
  const [rides, setRides] = useState([]);

  async function checkStatus() {
    const { data } = await supabase
      .from("rides")
      .select("*")
      .eq("user_email", email);

    setRides(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Check Ride Status
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={checkStatus}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Check
        </button>

        {rides.map((ride) => (
          <div key={ride.id} className="mt-4 p-3 border rounded-lg">
            <p><b>Pickup:</b> {ride.pickup}</p>
            <p><b>Drop:</b> {ride.drop_location}</p>
            <p>
              <b>Status:</b>{" "}
              <span className="text-green-600 font-semibold">
                {ride.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
