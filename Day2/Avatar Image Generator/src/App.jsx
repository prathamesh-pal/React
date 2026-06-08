import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men",
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women",
  },
];

function App() {
  const [src, setSrc] = useState("");
  const [option, setOption] = useState("male");

  const generate = (showToast = true) => {
    const selected = data.find((item) => item.value === option);

    if (!selected) return;

    let avatarUrl = "";

    if (option === "male" || option === "female") {
      const randomId = Math.floor(Math.random() * 100);
      avatarUrl = `${selected.url}/${randomId}.jpg`;
    } else {
      const seed = Math.random().toString(36).substring(2, 10);
      avatarUrl = `${selected.url}${seed}`;
    }

    setSrc(avatarUrl);

    if (showToast) {
      toast.info("New avatar generated!");
    }
  };

  const copyUrl = async () => {
    if (!src) return;

    try {
      await navigator.clipboard.writeText(src);
      toast.success("Avatar URL copied!");
    } catch (error) {
      toast.error("Failed to copy URL!");
    }
  };

  useEffect(() => {
    generate(false);
  }, [option]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black to-orange-200 flex items-center justify-center p-6">
        <div className="w-full max-w-md backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 bg-black/30">
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition duration-300"
              src={src}
              alt="avatar"
            />
          </div>

          {/* Heading */}
          <div className="text-center mt-6">
            <h1 className="text-3xl font-bold text-cyan-300">
              Avatar Generator
            </h1>

            <p className="text-white mt-2">
              Generate beautiful avatars for your website and projects.
            </p>
          </div>

          {/* Controls */}
          <div className="mt-8 space-y-4">
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-xl p-3 outline-none"
            >
              {data.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  className="text-black"
                >
                  {item.label}
                </option>
              ))}
            </select>

            {/* URL Box */}
            <div className="bg-black/20 border border-white/10 rounded-xl p-3 break-all">
              <p className="text-sm text-gray-300">
                {src || "Generate an avatar"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => generate()}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:scale-105 transition"
              >
                Change Avatar
              </button>

              <button
                onClick={copyUrl}
                className="flex-1 py-3 rounded-xl bg-green-500 text-white font-semibold hover:scale-105 transition"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </>
  );
}

export default App;