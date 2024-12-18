import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const RegisterFaculty = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    deptId: "",
    avatar: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("password", formData.password);
    if (formData.deptId) {
      formDataToSend.append("deptId", formData.deptId);
    }
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }
    if (capturedImage) {
      formDataToSend.append("cameraImage", capturedImage);
    }
    let localRole = localStorage.getItem('user')
    localRole = JSON.parse(localRole)
    const role = localRole.role
    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/register-faculty`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess("Faculty registered successfully!");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        deptId: "",
        avatar: null,
      });
      setCapturedImage(null);
    } catch (error) {
      setError("An error occurred while registering the faculty.");
    } finally {
      setLoading(false);
    }
  };

  const startCamera = () => {
    setCameraActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
        setError("Error accessing camera.");
      });
  };

  const stopCamera = () => {
    setCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasRef.current.toBlob((blob) => {
      setCapturedImage(blob);
    });
    stopCamera();
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Register Faculty</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department ID (Optional)</label>
              <Input type="text" name="deptId" value={formData.deptId} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Avatar</label>
              <Input type="file" name="avatar" onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button type="button" onClick={startCamera} disabled={cameraActive}>
              Start Camera
            </Button>
            <Button type="button" onClick={captureImage} disabled={!cameraActive}>
              Capture Image
            </Button>
            <Button type="button" onClick={stopCamera} disabled={!cameraActive}>
              Stop Camera
            </Button>
          </div>
          {cameraActive && (
            <div className="mt-4">
              <video ref={videoRef} className="w-64 h-auto" />
              <canvas ref={canvasRef} className="hidden" width="640" height="480" />
            </div>
          )}
          {capturedImage && (
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Captured Image Preview:</h2>
              <img src={URL.createObjectURL(capturedImage)} alt="Captured" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
          {formData.avatar && (
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Avatar Preview:</h2>
              <img src={URL.createObjectURL(formData.avatar)} alt="Avatar" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
          <Button type="submit" className="w-full mt-6 flex items-center justify-center" disabled={loading}>
            {loading ? <Spinner className="w-5 h-5 animate-spin" /> : "Register Faculty"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterFaculty;