"use client";

import { useState } from "react";

const vehicleRates = {
  auto: { baseFare: 30, perKm: 15 },
  car: { baseFare: 50, perKm: 18 },
  suv: { baseFare: 80, perKm: 22 },
};

export default function RideEstimator() {
  const [vehicle, setVehicle] = useState("car");
  const [distance, setDistance] = useState(1);
  const [fare, setFare] = useState(null);

  const calculateFare = () => {
    const rate = vehicleRates[vehicle];
    const distanceCharge = distance * rate.perKm;
    const total = rate.baseFare + distanceCharge;

    setFare({
      baseFare: rate.baseFare,
      distance,
      distanceCharge,
      total,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Ride Cost Estimator</h2>

      <select
        className="w-full border p-2 rounded"
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      >
        <option value="auto">Auto</option>
        <option value="car">Car</option>
        <option value="suv">SUV</option>
      </select>

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Enter distance (km)"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />

      <button
        onClick={calculateFare}
        className="w-full bg-black text-white p-2 rounded hover:opacity-90"
      >
        Get Estimate
      </button>

      {fare && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h3 className="font-semibold mb-2">Estimated Fare Breakdown</h3>

          <p>Base Fare: ₹{fare.baseFare}</p>
          <p>Distance: {fare.distance} km</p>
          <p>Distance Charge: ₹{fare.distanceCharge}</p>

          <hr className="my-2" />

          <p className="font-bold text-lg">
            Total Estimated Fare: ₹{fare.total}
          </p>
        </div>
      )}
    </div>
  );
}
