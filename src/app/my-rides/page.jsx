"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MyRidesPage() {
  const [rides, setRides] = useState([]);
  const [email, setEmail] = useState("");

  async function fetchRides(userEmail) {
    const { data, error } = await supabase
      .from("rides")
      .select("*")
      .eq("user_email", userEmail)
      .order("created_at", { ascending: false });

    if (!error) {
      setRides(data);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchRides(email);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Rides</h1>

      {/* Email Search */}
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto mb-8 flex gap-2"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border p-3 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Ride List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <p className="font-semibold">
              {ride.pickup} → {ride.drop_location}
            </p>
            <p>Vehicle: {ride.vehicle_type}</p>
            <p>Date: {ride.ride_date}</p>

            <p className="mt-2 font-bold">
              Status:{" "}
              {ride.status === "pending" && (
                <span className="text-yellow-600">Pending</span>
              )}
              {ride.status === "approved" && (
                <span className="text-green-600">Approved</span>
              )}
              {ride.status === "rejected" && (
                <span className="text-red-600">Rejected</span>
              )}
            </p>
          </div>
        ))}

        {rides.length === 0 && (
          <p className="text-center text-gray-500">
            No rides found.
          </p>
        )}
      </div>
    </div>
  );
}
