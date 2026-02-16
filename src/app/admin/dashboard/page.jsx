"use client";

import { generateAdminInsights } from "../../actions/adminInsights";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminDashboard() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [insights, setInsights] = useState("");
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    fetchRides();
  }, []);

  async function fetchRides() {
    const { data, error } = await supabase
      .from("rides")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setRides(data);
    }

    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from("rides")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      fetchRides();
    }
  }

  // 🧠 Prepare summary for AI
  function prepareSummaryData() {
    const totalRides = rides.length;

    const vehicleCount = {};
    const hourCount = {};

    rides.forEach((ride) => {
      vehicleCount[ride.vehicle_type] =
        (vehicleCount[ride.vehicle_type] || 0) + 1;

      const hour = new Date(ride.created_at).getHours();
      hourCount[hour] = (hourCount[hour] || 0) + 1;
    });

    let peakHour = "";
    let max = 0;

    for (let hour in hourCount) {
      if (hourCount[hour] > max) {
        max = hourCount[hour];
        peakHour = hour;
      }
    }

    const vehicleBreakdown = Object.entries(vehicleCount)
      .map(([type, count]) => `${type}: ${count}`)
      .join("\n");

    return {
      totalRides,
      vehicleBreakdown,
      peakHour: peakHour ? peakHour + ":00 hrs" : "No data",
    };
  }

  async function handleGenerateInsights() {
    setLoadingInsights(true);

    const summaryData = prepareSummaryData();
    const result = await generateAdminInsights(summaryData);

    setInsights(result);
    setLoadingInsights(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p>Loading rides...</p>
      ) : (
        <>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Pickup</th>
                  <th className="p-3">Drop</th>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {rides.map((ride) => (
                  <tr key={ride.id} className="border-b">
                    <td className="p-3">{ride.user_name}</td>
                    <td className="p-3">{ride.user_email}</td>
                    <td className="p-3">{ride.pickup}</td>
                    <td className="p-3">{ride.drop_location}</td>
                    <td className="p-3">{ride.vehicle_type}</td>
                    <td className="p-3">{ride.ride_date}</td>

                    <td className="p-3 font-semibold">
                      {ride.status === "pending" && (
                        <span className="text-yellow-600">Pending</span>
                      )}
                      {ride.status === "approved" && (
                        <span className="text-green-600">Approved</span>
                      )}
                      {ride.status === "rejected" && (
                        <span className="text-red-600">Rejected</span>
                      )}
                    </td>

                    <td className="p-3 space-x-2">
                      {ride.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(ride.id, "approved")
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded-lg"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(ride.id, "rejected")
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded-lg"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {rides.length === 0 && (
              <p className="p-4 text-center text-gray-500">
                No rides found.
              </p>
            )}
          </div>

          {/* 🧠 AI INSIGHTS PANEL */}
          <div className="mt-10">
            <button
              onClick={handleGenerateInsights}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              {loadingInsights ? "Generating..." : "🧠 Generate Insights"}
            </button>

            {insights && (
              <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                  AI Insights Report
                </h2>
                <pre className="whitespace-pre-wrap text-gray-700">
                  {insights}
                </pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
