import React from "react";
import { BiUpload } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

function App() {
 const MAX_FILE_SIZE = 2 * 1024 * 1024;

const chooseFile = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    return toast.error("Please select an image", {
      position: "top-center",
    });
  }

  if (file.size > MAX_FILE_SIZE) {
    return toast.error("Please select an image less than 2 MB", {
      position: "top-center",
    });
  }

  toast.success("Image selected successfully!", {
    position: "top-center",
  });

  console.log(file);
};
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-700 to-blue-500 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-white tracking-tight">
              Image Storage
            </h1>

            <p className="text-slate-400 mt-4 text-lg">
              Upload, organize and manage your images effortlessly.
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

            <label
              className="
              group
              relative
              flex
              flex-col
              items-center
              justify-center
              h-[400px]
              rounded-[32px]
              border-2
              border-dashed
              border-white/20
              cursor-pointer
              overflow-hidden
              transition-all
              duration-500
              hover:border-indigo-400
              hover:bg-white/5
            "
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />
              </div>

              {/* Icon */}
              <div
                className="
                relative
                z-10
                w-28
                h-28
                rounded-full
                bg-linear-to-br
                from-indigo-500
                to-purple-600
                flex
                items-center
                justify-center
                shadow-2xl
                group-hover:scale-110
                transition-transform
                duration-500
              "
              >
                <BiUpload className="text-white text-5xl" />
              </div>

              {/* Text */}
              <div className="relative z-10 mt-8 text-center">
                <h2 className="text-3xl font-bold text-white">
                  Upload Images
                </h2>

                <p className="text-slate-400 mt-3">
                  Drag & drop files here or click to browse
                </p>

                <div
                  className="
                  inline-flex
                  mt-8
                  px-6
                  py-3
                  rounded-full
                  bg-white
                  text-slate-900
                  font-semibold
                  shadow-lg
                  group-hover:scale-105
                  transition-transform
                "
                >
                  Choose Files
                </div>
              </div>

              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={chooseFile}
              />
            </label>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;