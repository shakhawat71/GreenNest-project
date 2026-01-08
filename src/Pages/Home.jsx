import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import plant1 from "../assets/plant1.jpg";
import plant2 from "../assets/plant2.jpg";
import plant3 from "../assets/plant3.jpg";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [plants, setPlants] = useState([]);
  const [careTips, setCareTips] = useState([]);
  const [experts, setExperts] = useState([]);


  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const slides = [
    {
      img: plant1,
      title: "Bring Nature Home",
      text: "Fresh plants, fresher life.",
    },
    {
      img: plant2,
      title: "Love Your Plants",
      text: "Care tips to keep them thriving.",
    },
    {
      img: plant3,
      title: "Green Your Space",
      text: "Transform your home with greenery.",
    },
  ];


  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.log(err));
  }, []);

  const topRatedPlants = [...plants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  fetch("/careTips.json")
    .then((res) => res.json())
    .then((data) => setCareTips(data))
    .catch((err) => console.log(err));
}, []);

  useEffect(() => {
  fetch("/experts.json")
    .then((res) => res.json())
    .then((data) => setExperts(data))
    .catch((err) => console.log(err));
}, []);



  // Scroll carousel horizontally ONLY (timer/buttons)
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: activeSlide * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [activeSlide]);

  return (
    <div className="bg-white">
      {/* HERO SLIDER */}
      <div className="w-full h-screen relative overflow-hidden">
        <div
          ref={carouselRef}
          className="carousel w-full h-screen overflow-hidden scroll-smooth"
          style={{ touchAction: "pan-y" }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="carousel-item w-full h-screen relative cursor-pointer shrink-0"
              onClick={() => navigate("/plants")}
            >
              <img
                src={slide.img}
                className="w-full h-full object-cover object-center"
                alt="plant"
                draggable="false"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-6xl font-bold text-white">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-white mt-4">
                  {slide.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/*SLIDER BUTTONS */}
        <div className="flex w-full justify-center gap-2 py-4 absolute bottom-0 left-0 bg-transparent">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(index);
              }}
              className={`btn btn-xs ${
                activeSlide === index
                  ? "btn-success text-white"
                  : "bg-black text-white hover:bg-gray-800 border-none"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* TOP RATED INDOOR PLANTS SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
          Top Rated Indoor Plants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {topRatedPlants.map((plant) => (
            <div
              key={plant.plantId}
              className="card group bg-linear-to-b from-green-800 via-green-300 to-white shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
            >
              {/*Image with hover zoom animation */}
              <figure className="px-6 pt-6 overflow-hidden rounded-xl">
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="rounded-xl h-44 w-full object-cover transition duration-300 group-hover:scale-110"
                />
              </figure>

              {/*Center body */}
              <div className="card-body text-center items-center">
                <h2 className="card-title text-green-800 text-xl font-bold">
                  {plant.plantName}
                </h2>
                <p className="text-sm font-bold text-gray-500">
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
      </div>
      
      {/* PLANT CARE TIPS SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
          Plant Care Tips
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {careTips.map((tip) => (
            <div
              key={tip.id}
              className="card bg-linear-to-b from-green-800 via-green-300 to-white shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
            >
              <figure className="px-6 pt-6 overflow-hidden rounded-xl">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="rounded-xl h-36 w-full object-cover transition duration-300 hover:scale-110"
                />
              </figure>

              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl font-bold text-green-800">{tip.title}</h3>
                <p className="text-gray-700 text-sm">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MEET OUR GREEN EXPERTS SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
          Meet Our Green Experts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="card group bg-linear-to-b from-green-800 via-green-300 to-white shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
            >
              {/*Expert Image */}
              <figure className="px-6 pt-6 overflow-hidden rounded-xl">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="rounded-xl h-40 w-full object-cover transition duration-300 group-hover:scale-110"
                />
              </figure>

              {/*Expert Info */}
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl font-bold text-green-800">
                  {expert.name}
                </h3>
                <p className="text-sm font-bold text-gray-600">
                  {expert.specialization}
                </p>
                <p className="text-xs font-bold text-gray-700">{expert.experience}</p>
                <p className="text-sm text-gray-700 mt-2">{expert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
