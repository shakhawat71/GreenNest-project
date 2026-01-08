import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        const foundPlant = data.find((p) => p.plantId === parseInt(id));
        setPlant(foundPlant);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-red-500">Plant not found ❌</h2>
        <button
          className="btn btn-success mt-4"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/*Image */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src={plant.image}
            alt={plant.plantName}
            className="w-full h-full object-cover"
          />
        </div>

        {/*Details */}
        <div>
          <h1 className="text-4xl font-bold text-green-700">{plant.plantName}</h1>
          <p className="text-gray-500 mt-2">{plant.category}</p>

          <div className="flex gap-6 mt-4">
            <p className="text-xl font-semibold text-green-700">${plant.price}</p>
            <p className="text-lg font-medium">⭐ {plant.rating}</p>
          </div>

          <div className="mt-4 space-y-2 text-gray-700">
            <p><span className="font-semibold">Available Stock:</span> {plant.availableStock}</p>
            <p><span className="font-semibold">Care Level:</span> {plant.careLevel}</p>
            <p><span className="font-semibold">Provider:</span> {plant.providerName}</p>
          </div>

          <button
            className="btn btn-success mt-6"
            onClick={() => navigate("/plants")}
          >
            Back to Plants
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-5xl mx-auto mt-10 bg-base-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Description
        </h2>
        <p className="text-gray-700 whitespace-pre-line">{plant.description}</p>
      </div>
    </div>
  );
}
