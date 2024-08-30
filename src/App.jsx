import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "./App.css";

export default function App() {
  const [uploaded, setUploaded] = useState(0);
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [compressedImageUrl, setCompressedImageUrl] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setUploaded(1);
  };

  const handleCompression = async () => {
    if (uploaded) {
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };
      try {
        const compressedImg = await imageCompression(originalImage, options);
        setCompressedImage(compressedImg);
        setCompressedImageUrl(URL.createObjectURL(compressedImg));
      } catch (error) {
        console.error("Erreur de compression:", error);
      }
    }
  };

  return (
    <div>
      <h2>Compression d'image</h2>
      <div className="container">
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleCompression}>Compresser</button>
        <div className="flex-container">
          {originalImageUrl && (
            <div>
              <h3>Avant ({(originalImage.size / 1000).toFixed(2)} Kb):</h3>
              <img src={originalImageUrl} alt="Original" />
            </div>
          )}
          {compressedImageUrl && (
            <div>
              <h3>Après ({(compressedImage.size / 1000).toFixed(2)} Kb):</h3>
              <a href={compressedImageUrl} download="image compressée.jpg">
                <img src={compressedImageUrl} alt="Compressed" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
