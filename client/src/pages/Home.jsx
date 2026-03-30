import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-5">

      <h1 className="text-5xl font-bold mb-6 text-center">
        AI Image Editor 🚀
      </h1>

      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Edit your images with powerful tools like brightness, contrast,
        saturation, blur, grayscale and more — all in real time.
      </p>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-800 p-4 rounded">🎛️ Brightness & Contrast</div>
        <div className="bg-gray-800 p-4 rounded">🎨 Saturation & Hue</div>
        <div className="bg-gray-800 p-4 rounded">🌫️ Blur & Grayscale</div>
        <div className="bg-gray-800 p-4 rounded">💾 Download Image</div>
      </div>

      <button
        onClick={() => navigate("/editor")}
        className="bg-blue-500 px-6 py-3 rounded text-lg hover:bg-blue-600"
      >
        Get Started →
      </button>

    </div>
  );
}

export default Home;