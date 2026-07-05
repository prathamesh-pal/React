import { useState } from "react";
import "./App.css";
import getYoutubeId from "get-youtube-id";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const fetchThumbnail = (e) => {
    e.preventDefault();

    const videoId = getYoutubeId(url);

    if (videoId) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnail(thumbnailUrl);
      toast.success("Thumbnail loaded!");
    } else {
      toast.error("Invalid YouTube URL");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-yellow-600 via-yellow-400 to-yellow-500 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              YouTube Thumbnail Downloader
            </h1>

            <p className="text-gray-800 mt-3">
              Paste any YouTube video URL and preview its thumbnail instantly.
            </p>
          </div>

          <form
            onSubmit={fetchThumbnail}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="flex-1 p-4 rounded-xl bg-white text-gray-800 outline-none border-2 border-transparent focus:border-indigo-500 transition-all"
              required
            />

            <button
              type="submit"
              className="px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 shadow-lg hover:scale-105"
            >
              Get Thumbnail
            </button>
          </form>

          <div className="mt-10">
            <img
              src={thumbnail || "https://placehold.co/1280x720?text=Thumbnail+Preview"}
              alt="Thumbnail Preview"
              className="w-full rounded-2xl shadow-xl"
            />
          </div>

          {thumbnail && (
            <div className="mt-6 flex justify-center">
              <a
                href={thumbnail}
                download="youtube-thumbnail.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all"
              >
                Download Thumbnail
              </a>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;