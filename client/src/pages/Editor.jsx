import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Editor() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [preview, setPreview] = useState(null);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [hue, setHue] = useState(0);
  const [cropSize, setCropSize] = useState(100); // % of image

  // Upload Image
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Reset Filters
  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setGrayscale(0);
    setHue(0);
  };

  // Download Image
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = preview;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
        blur(${blur}px)
        grayscale(${grayscale}%)
        hue-rotate(${hue}deg)
      `;
      const cropWidth = img.width * (cropSize / 100);
const cropHeight = img.height * (cropSize / 100);

const startX = (img.width - cropWidth) / 2;
const startY = (img.height - cropHeight) / 2;

canvas.width = cropWidth;
canvas.height = cropHeight;

      ctx.drawImage(
  img,
  startX,
  startY,
  cropWidth,
  cropHeight,
  0,
  0,
  cropWidth,
  cropHeight
);

      const link = document.createElement("a");
      link.download = "edited-image.png";
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold">Editor 🎨</h1>

        <div></div>
      </div>

      {/* Upload */}
      <div className="text-center mb-5">
        <input type="file" onChange={handleImage} />
      </div>

      {/* Preview */}
      {preview && (
        <div className="flex justify-center mb-6">
          <img
            src={preview}
            alt="preview"
            className="max-w-md rounded-lg shadow-lg"
            style={{
              filter: `
                brightness(${brightness}%)
                contrast(${contrast}%)
                saturate(${saturation}%)
                blur(${blur}px)
                grayscale(${grayscale}%)
                hue-rotate(${hue}deg)
              `,
            }}
          />
        </div>
      )}

      {/* Controls */}
      {preview && (
        <div className="max-w-md mx-auto bg-gray-800 p-5 rounded-lg space-y-4">

          <h2 className="text-xl font-semibold text-center mb-3">
            Adjustments
          </h2>

        {/* Crop */}
<div>
  <label>Crop: {cropSize}%</label>
  <input
    type="range"
    min="10"
    max="100"
    value={cropSize}
    onChange={(e) => setCropSize(e.target.value)}
    className="w-full"
  />
</div>
          {/* Brightness */}
          <div>
            <label>Brightness: {brightness}%</label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Contrast */}
          <div>
            <label>Contrast: {contrast}%</label>
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Saturation */}
          <div>
            <label>Saturation: {saturation}%</label>
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Blur */}
          <div>
            <label>Blur: {blur}px</label>
            <input
              type="range"
              min="0"
              max="10"
              value={blur}
              onChange={(e) => setBlur(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Grayscale */}
          <div>
            <label>Grayscale: {grayscale}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={grayscale}
              onChange={(e) => setGrayscale(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Hue */}
          <div>
            <label>Hue: {hue}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={resetFilters}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>

            <button
              onClick={downloadImage}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Download
            </button>
          </div>

        </div>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden"></canvas>

    </div>
  );
}

export default Editor;