import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Fetch plant details from JSON
  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        const singlePlant = data.find((p) => p.plantId === parseInt(id));
        setPlant(singlePlant);
      });
  }, [id]);

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Consultation booked successfully.");

    // Clear form
    setFormData({ name: "", email: "" });
  };

  // Loading
  if (!plant) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen px-4 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Side: Plant Image */}
        <div className="rounded-xl shadow-lg overflow-hidden">
          <img
            src={plant.image}
            alt={plant.plantName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Plant Info */}
        <div>
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            {plant.plantName}
          </h1>

          <p className="text-gray-600 mb-4">
            {plant.description}
          </p>

          <div className="space-y-2 text-lg">
            <p className="font-bold text-black">
              Category:
              {plant.category}
            </p>
            <p className="font-bold text-black">
              Price: ${plant.price}
            </p>
            <p className="font-bold text-black">
             Rating: {plant.rating}
            </p>
            <p className="font-bold text-black">
              Stock:
              {plant.availableStock} Available
            </p>
            <p className="font-bold text-black">
             Care Level:
              {plant.careLevel}
            </p>
            <p className="font-bold text-black">
              Provider: 
              {plant.providerName}
            </p>
          </div>

          {/* Book Consultation Form */}
          <div className="mt-10 p-6 rounded-xl shadow-md bg-linear-to-b from-green-200 to-white">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Book Consultation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full text-black bg-white"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                className="input input-bordered text-black w-full bg-white"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn btn-success w-full">
                Book Now
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
