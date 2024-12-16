import React, { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Webcam from "react-webcam";

export default function RegisterFaculty() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    avatar: null,
    capturedImage: null,
    password: "",
    deptId: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file });
      if (e.target.name === "avatar") {
        setAvatarPreview(URL.createObjectURL(file));
      } else if (e.target.name === "capturedImage") {
        setImagePreview(URL.createObjectURL(file));
      }
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

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFormData({ ...formData, capturedImage: imageSrc });
      setImagePreview(imageSrc);
    }
  }, [webcamRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, avatar, password, deptId, capturedImage } = formData;

    if (!fullName || !email || !phoneNumber || !password || !deptId) {
      setError("All fields except avatar and captured image are required.");
      setSuccess("");
      return;
    }

    setLoading(true); // Start spinner
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", fullName);
    formDataToSend.append("email", email);
    formDataToSend.append("phoneNumber", phoneNumber);
    formDataToSend.append("password", password);
    formDataToSend.append("deptId", deptId);
    if (avatar) {
      formDataToSend.append("avatar", avatar);
    }
    if (capturedImage) {
      const blob = dataURLToBlob(capturedImage);
      formDataToSend.append("cameraImage", blob, generateRandomFileName());
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/register-faculty', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setSuccess("Faculty registered successfully.");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        avatar: null,
        capturedImage: null,
        password: "",
        deptId: "",
      });
      setAvatarPreview(null);
      setImagePreview(null);
      setUseWebcam(false);
    } catch (err) {
      console.error("Error registering faculty:", err);
      setError("An error occurred while registering the faculty.");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Register Faculty
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Department ID
              </label>
              <Input
                type="text"
                name="deptId"
                value={formData.deptId}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Avatar (Optional)
              </label>
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Captured Image (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant={useWebcam ? 'default' : 'outline'}
                  onClick={() => setUseWebcam(!useWebcam)}
                >
                  {useWebcam ? 'Use Upload' : 'Use Webcam'}
                </Button>
              </div>
              {useWebcam ? (
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full h-48 object-cover mt-2"
                  />
                  <Button
                    type="button"
                    className="w-full mt-2"
                    onClick={captureImage}
                  >
                    Capture Image
                  </Button>
                </>
              ) : (
                <Input
                  type="file"
                  name="capturedImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              )}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Image Previews
            </h2>
            <div className="flex space-x-4">
              {avatarPreview && (
                <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 rounded-md" />
              )}
              {imagePreview && (
                <img src={imagePreview} alt="Captured Preview" className="w-32 h-32 rounded-md" />
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-5 h-5 animate-spin" /> : "Register Faculty"}
          </Button>
        </form>
      </div>
    </div>
  );
}