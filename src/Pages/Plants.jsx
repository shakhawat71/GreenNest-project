import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Plants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter, Sort States
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const navigate = useNavigate();

  // Fetch plants from JSON
  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Unique Categories
  const categories = useMemo(() => {
    const unique = [...new Set(plants.map((p) => p.category))];
    return ["All", ...unique];
  }, [plants]);

  // Filter + Search + Sort Logic
  const filteredPlants = useMemo(() => {
    let result = [...plants];

    // Search by name
    if (searchText.trim() !== "") {
      result = result.filter((plant) =>
        plant.plantName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((plant) => plant.category === selectedCategory);
    }

    // Sorting
    if (sortOption === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    }
    if (sortOption === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }
    if (sortOption === "ratingHigh") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [plants, searchText, selectedCategory, sortOption]);

  // Loading Spinner
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#C8E6C9]">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="bg-[#C8E6C9] min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          All Plants 🌱
        </h2>

       {/* Search + Filter + Sort */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search plants..."
              className="input input-bordered w-full md:w-1/3 bg-white text-black placeholder:text-black shadow-md 
              focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Filter */}
            <select
              className="select select-bordered w-full md:w-1/3 bg-white text-black shadow-md 
              focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="select select-bordered w-full md:w-1/3 bg-white text-black shadow-md 
              focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="ratingHigh">Rating: High → Low</option>
            </select>
          </div>


        {/* NO RESULT */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-red-500">
              No plants found ❌
            </h3>
            <p className="text-gray-600 mt-2">
              Try searching with another keyword or choose a different category.
            </p>
            <button
              className="btn btn-success mt-6"
              onClick={() => {
                setSearchText("");
                setSelectedCategory("All");
                setSortOption("default");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Showing Results Count */}
            <p className="text-gray-600 mb-6">
              Showing <span className="font-bold">{filteredPlants.length}</span>{" "}
              plants
            </p>

            {/* Plants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredPlants.map((plant) => (
                <div
                  key={plant.plantId}
                  className="card group bg-linear-to-b from-green-800 via-green-300 to-white shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
                >
                  {/* Image */}
                  <figure className="px-6 pt-6 overflow-hidden rounded-xl">
                    <img
                      src={plant.image}
                      alt={plant.plantName}
                      className="rounded-xl h-44 w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </figure>

                  {/* Card Body */}
                  <div className="card-body text-center items-center">
                    <h2 className="card-title text-green-800 text-xl font-bold">
                      {plant.plantName}
                    </h2>

                    <p className="text-sm font-bold text-gray-700">
                      {plant.category}
                    </p>

                    {/* Price + Rating */}
                    <div className="flex justify-between w-full mt-2">
                      <p className="font-bold text-black">${plant.price}</p>
                      <p className="font-bold text-black">⭐ {plant.rating}</p>
                    </div>

                    <div className="card-actions mt-4 w-full">
                      <button
                        className="btn btn-outline bg-white btn-success w-full"
                        onClick={() => navigate(`/plantDetails/${plant.plantId}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
