import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Webcam from 'react-webcam';

export function LoginCard({setUser}) {
  const [loginMethod, setLoginMethod] = useState('otp');
  const [showPassword, setShowPassword] = useState(false);
  const [imageMethod, setImageMethod] = useState('upload');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loadingSendOTP, setLoadingSendOTP] = useState(false);
  const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false);
  const [loadingFaceLogin, setLoadingFaceLogin] = useState(false);

  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [otp, setOtp] = useState('');
  const [faceEmail, setFaceEmail] = useState('');
  const [faceRole, setFaceRole] = useState('');

  const toggleLoginMethod = () => {
    if (loginMethod === 'otp') {
      setLoginMethod('face');
    } else {
      setLoginMethod('otp');
    }
  };

  useEffect(() => {
    if (loginMethod === 'otp') {
      setCapturedImage(null);
      setImageFileName("");
      setCameraActive(false);
    }
  }, [loginMethod]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageMethodChange = (method) => {
    setImageMethod(method);
    setCapturedImage(null);
    setImageFileName("");
    if (method === 'capture') {
      setCameraActive(true);
    } else {
      setCameraActive(false);
    }
  };

  const generateRandomFileName = () => {
    return `capturedImage${Math.floor(Math.random() * 10000)}.jpg`;
  };

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const randomFileName = generateRandomFileName();
      setCapturedImage(imageSrc);
      setImageFileName(randomFileName);
    }
  }, [webcamRef]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
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

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoadingSendOTP(true);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/login-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      alert('OTP sent successfully');
    } catch (error) {
      console.error('Error while sending OTP', error);
      alert('Failed to send OTP');
    } finally {
      setLoadingSendOTP(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoadingVerifyOTP(true);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/login-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
      const data = await response.json()
      console.log('Server Response:', data); // Debug log

    // Extract user data from correct path in response
    const userData = data.data.user;
    console.log('User Data to set:', userData);
      setUser(userData);
      alert('OTP verified successfully');
      navigate(`/dashboard/${role}`);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP');
    } finally {
      setLoadingVerifyOTP(false);
    }
  };

  const handleFaceLogin = async (e) => {
    e.preventDefault();
    setLoadingFaceLogin(true);

    const formData = new FormData();
    formData.append('email', faceEmail);
    formData.append('role', faceRole);

    if (imageMethod === 'upload') {
      formData.append('cameraImage', uploadedImage);
    } else {
      const blob = dataURLToBlob(capturedImage);
      formData.append('cameraImage', blob, 'capturedImage.jpg');
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${faceRole}/face-login`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Failed to login with face recognition');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      const userData = data.data.user;
      console.log('User Data to set:', userData);
      setUser(userData);
      alert('Face recognition login successful');
      navigate(`/dashboard/${faceRole}`);
    } catch (error) {
      console.error('Error with face recognition login:', error);
      alert('Failed to login with face recognition');
    } finally {
      setLoadingFaceLogin(false);
    }
  };

  return (
    <Card className="w-[400px] max-w-full overflow-hidden justify-center">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant={loginMethod === 'otp' ? "default" : "outline"}
            onClick={toggleLoginMethod}
          >
            Login with OTP
          </Button>
          <Button 
            variant={loginMethod === 'face' ? "default" : "outline"}
            onClick={toggleLoginMethod}
          >
            Face Login
          </Button>
        </div>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          {loginMethod === 'otp' 
            ? "Login using your email, password, and OTP." 
            : "Login using face recognition."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden" style={{ transition: 'transform 0.3s ease-in-out' }}>
          <div className="flex" style={{ transform: `translateX(${loginMethod === 'otp' ? '0%' : '-100%'})` }}>
            {/* OTP Login Form */}
            <form className="w-full flex-shrink-0">
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Role Select */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role-select">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon"
                      className="absolute right-0 top-0" 
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Send OTP Button */}
                <Button className="w-full mb-2" onClick={handleSendOTP} disabled={loadingSendOTP}>
                  {loadingSendOTP ? <Spinner /> : 'Send OTP'}
                </Button>

                {/* OTP Input */}
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                {/* Verify OTP & Login Button */}
                <Button className="w-full" onClick={handleVerifyOTP} disabled={loadingVerifyOTP}>
                  {loadingVerifyOTP ? <Spinner /> : 'Verify OTP & Login'}
                </Button>
              </div>
            </form>

            {/* Face Login Form */}
            <form className="w-full flex-shrink-0" onSubmit={handleFaceLogin}>
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="faceEmail">Email</Label>
                  <Input 
                    id="faceEmail" 
                    type="email" 
                    placeholder="Enter your email"
                    value={faceEmail}
                    onChange={(e) => setFaceEmail(e.target.value)}
                  />
                </div>

                {/* Role Select */}
                <div className="space-y-2">
                  <Label htmlFor="faceRole">Role</Label>
                  <Select value={faceRole} onValueChange={setFaceRole}>
                    <SelectTrigger id="faceRole-select">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Method Selection */}
                <div className="space-y-2">
                  <Label>Choose Image Method</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant={imageMethod === 'upload' ? 'default' : 'outline'}
                      onClick={() => handleImageMethodChange('upload')}
                    >
                      Upload Image
                    </Button>
                    <Button
                      type="button"
                      variant={imageMethod === 'capture' ? 'default' : 'outline'}
                      onClick={() => handleImageMethodChange('capture')}
                    >
                      Capture Image
                    </Button>
                  </div>
                </div>

                {/* Upload Image Field */}
                {imageMethod === 'upload' && (
                  <div className="space-y-2">
                    <Label htmlFor="faceImageUpload">Upload Image</Label>
                    <Input 
                      id="faceImageUpload" 
                      type="file" 
                      accept="image/*" 
                      className="block w-full"
                      onChange={handleFileChange} // Handle file selection
                    />
                  </div>
                )}

                {/* Capture Image Field */}
                {imageMethod === 'capture' && cameraActive && (
                  <div className="space-y-2">
                    <Webcam 
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      className="w-full h-48 object-cover"
                    />
                    <Button 
                      type="button"
                      className="w-full mt-2"
                      onClick={captureImage}
                    >
                      Capture Image
                    </Button>

                    {/* Display Captured Image */}
                    {capturedImage && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">
                          Captured Image Preview:
                        </p>
                        <img 
                          src={capturedImage} 
                          alt="Captured Preview" 
                          className="w-full h-48 object-cover border"
                        />
                        <p className="text-sm mt-1">File Name: {imageFileName}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Login with Face Recognition Button */}
                <Button type="submit" className="w-full" disabled={loadingFaceLogin}>
                  {loadingFaceLogin ? <Spinner /> : 'Login with Face Recognition'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button variant="link" className="w-full" onClick={()=>navigate('/forgot-password')}>
          Forgot Password?
        </Button>
      </CardFooter>
    </Card>
  );
}