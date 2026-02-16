"use client";

import { useState } from "react";
import { bookRide } from "../actions/rideActions";

export default function BookRidePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData(e.target);
    const res = await bookRide(formData);

    setLoading(false);

    if (res?.success) {
      setMessage("Request initiated successfully! Check MYRIDE for CONFIRMATION...");
      e.target.reset();
    } else {
      setError(res?.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Book a Ride
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Pickup */}
          <input
            name="pickup"
            type="text"
            placeholder="Pickup Location"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Drop */}
          <input
            name="drop"
            type="text"
            placeholder="Drop Location"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Ride Date */}
          <input
            name="ride_date"
            type="date"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Vehicle Type */}
          <select
            name="vehicle_type"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Vehicle Type</option>
            
            <option value="Auto">Auto</option>
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Ride"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="text-center mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
