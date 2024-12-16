import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component

export default function UpdateFaceData() {
  const webcamRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  const startCamera = () => {
    setIsCameraActive(true);
    setCapturedImage(null);
    setUploadedImage(null);
    setSuccessMessage(""); // Clear success message when starting the camera
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

  const generateRandomFileName = () => {
    return `capturedImage${Math.floor(Math.random() * 10000)}.jpg`;
  };

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!capturedImage && !uploadedImage) {
      setError("Please upload or capture an image.");
      return;
    }

    const imageData = capturedImage || uploadedImage;
    setIsSubmitting(true); // Start loading spinner

    const localData = localStorage.getItem('user');
    const user = JSON.parse(localData);
    const role = user.role.toLowerCase();

    const formData = new FormData();
    const blob = dataURLToBlob(imageData);
    const fileName = generateRandomFileName();
    formData.append("cameraImage", blob, fileName);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/update-face`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccessMessage("Face data updated successfully!");
      setError(""); // Clear error if any
      setCapturedImage(null); // Reset captured image
      setUploadedImage(null); // Reset uploaded image
      stopCamera(); // Turn off camera after submit
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false); // Stop loading spinner
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Update Face Data
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
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
          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Spinner size="sm" className="mr-2" />
                Submitting...
              </div>
            ) : (
              "Submit Image"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}