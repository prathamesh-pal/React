import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    const random = Math.floor(Math.random() * 16777215);
    return `#${random.toString(16).padStart(6, "0")}`;
  };

  const generateGradient = () => {
    const generatedGradients = [];

    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);

      const gradient =
        type === "linear"
          ? `linear-gradient(${degree}deg, ${color1}, ${color2})`
          : `radial-gradient(circle, ${color1}, ${color2})`;

      generatedGradients.push({
        gradient,
        color1,
        color2,
      });
    }

    setGradients(generatedGradients);
  };

  const copyGradient = async (gradient) => {
    try {
      await navigator.clipboard.writeText(gradient);
      toast.success("Gradient copied!");
    } catch (error) {
      toast.error("Failed to copy!");
      console.error(error);
    }
  };

  useEffect(() => {
    generateGradient();
  }, [type, num]);

  return (
    <>
      <div className="min-h-screen  from-slate-100 via-blue-50 to-purple-100 p-6">
        <div className="max-w-7xl mx-auto bg-amber-50 rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              🎨 Gradient Generator
            </h1>
            <p className="text-slate-500 mt-2">
              Create beautiful CSS gradients instantly.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            <input
              type="number"
              min="1"
              max="200"
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
              className="px-4 py-3 border border-slate-300 rounded-xl w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Number of gradients"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl w-52 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>

            <button
              onClick={generateGradient}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Generate
            </button>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <p className="text-slate-600">
              Generated {gradients.length} gradients
            </p>
          </div>

          {/* Gradient Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gradients.map((item, index) => (
              <div
                key={index}
                className="h-56 rounded-2xl relative overflow-hidden shadow-md group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ background: item.gradient }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />


                {/* Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/5 backdrop-blur-md">
                  <p className="text-xs text-slate-800 truncate mb-2">
                    {item.gradient}
                  </p>

                  <button
                    onClick={() => copyGradient(item.gradient)}
                    className="w-full bg-blue/10 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Copy CSS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;