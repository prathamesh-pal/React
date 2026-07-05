import "animate.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// API KEY EX: 
const Api = "ckuwhfiwghiowoifvwibciwiyvgbwibviwviwbivwbui9"



function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("people");

  const fetchImages = async () => {
    try {
      setLoading(true)
      const options = {
        headers: {
          Authorization: Api
        }
      }
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=12`,
        options
      ); console.log(res.data)
      setImages(res.data.photos)
    }
    catch (err) {
      toast.error("Failed to fetch images.")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex gap-4">
          <div className="w-7 h-7 rounded-full bg-indigo-600 animate-loader" />
          <div className="w-7 h-7 rounded-full bg-indigo-600 animate-loader [animation-delay:0.15s]" />
          <div className="w-7 h-7 rounded-full bg-indigo-600 animate-loader [animation-delay:0.3s]" />
          <div className="w-7 h-7 rounded-full bg-indigo-600 animate-loader [animation-delay:0.45s]" />
        </div>
      </section>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 animate__animated animate__fadeIn">

      {/* Header */}
      <div className="flex flex-col items-center pt-14 pb-10 px-4">
        <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
          Image Finder
        </h1>

        <p className="text-slate-500 text-center max-w-xl text-lg">
          Discover, explore, and save beautiful images with a clean and modern
          gallery experience.
        </p>
      </div>

      {/* Search Section */}
      <div className="flex justify-center px-4 mb-14">
        <form onSubmit={(e) => {
          e.preventDefault();
          fetchImages();
        }} className="flex w-full max-w-3xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search amazing photos..."
            className="
              flex-1
              px-6
              py-4
              rounded-l-2xl
              bg-white
              border
              border-slate-200
              shadow-md
              text-slate-700
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
          />

          <button
            className="
              px-8
              rounded-r-2xl
              bg-indigo-600
              text-white
              font-semibold
              shadow-md
              hover:bg-indigo-700
              transition-all
              duration-300
            "
          >
            Search
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="w-[92%] max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 pb-12">
        {images
          .map((items, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-slate-200
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                cursor-pointer
              "
            >
              {/* Image Placeholder */}
              <div className="h-64 bg-linear-to-br from-indigo-100 via-indigo-50 to-slate-100 flex items-center justify-center object-cover">
                <img
                  src={items.src.large}
                  alt={items.alt}
                  className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                />              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                {items.photographer}
                </h3>

                <p className="text-slate-500 text-sm mb-4">
                  <p>{items.alt || "Beautiful high-quality image."}</p>                </p>

                <div className="flex justify-between items-center">
                  <a
                    className="
                      px-4
                      py-2
                      bg-indigo-600
                      text-white
                      rounded-xl
                      text-sm
                      font-medium
                      hover:bg-indigo-700
                      transition
                    "

                    href={items.src.original}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>

    </div>
  );
}

export default App;