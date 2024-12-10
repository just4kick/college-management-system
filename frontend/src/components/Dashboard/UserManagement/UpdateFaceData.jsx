import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdateFaceData() {
  const webcamRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState("");

  const startCamera = () => {
    setIsCameraActive(true);
    setCapturedImage(null);
    setUploadedImage(null);
  };

  const stopCamera = () => {
    setIsCameraActive(false);
  };

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setUploadedImage(null);
    } else {
      setError("Webcam not accessible.");
    }
  }, [webcamRef]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setCapturedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError("No file selected.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!capturedImage && !uploadedImage) {
      setError("Please upload or capture an image.");
      return;
    }

    const imageData = capturedImage || uploadedImage;
    console.log("Image Data Submitted:", imageData);

    setError("");
    alert("Image successfully submitted.");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Update Face Data
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Webcam Section */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Capture Image from Webcam
              </h2>
              {isCameraActive ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full max-w-xs h-auto rounded-md shadow-lg"
                />
              ) : (
                <div className="w-full max-w-xs h-48 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md shadow-lg">
                  Camera is off
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-2">
                <Button type="button" onClick={startCamera} className="w-24">
                  Start
                </Button>
                <Button
                  type="button"
                  onClick={stopCamera}
                  disabled={!isCameraActive}
                  className="w-24"
                >
                  Stop
                </Button>
                <Button
                  type="button"
                  onClick={captureImage}
                  disabled={!isCameraActive}
                  className="w-24"
                >
                  Capture
                </Button>
              </div>
            </div>

            {/* Captured Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Image Preview
              </h2>
              {capturedImage || uploadedImage ? (
                <img
                  src={capturedImage || uploadedImage}
                  alt="Preview"
                  className="w-full max-w-xs h-auto rounded-md shadow-md"
                />
              ) : (
                <div className="w-full max-w-xs h-48 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md shadow-lg">
                  No image available
                </div>
              )}
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-4">
                Upload Image
              </h2>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6">
            Submit Image
          </Button>
        </form>
      </div>
    </div>
  );
}
