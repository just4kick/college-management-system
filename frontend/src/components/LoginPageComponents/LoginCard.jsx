'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Eye, EyeOff, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Webcam from 'react-webcam'

export function LoginCard() {
  const [loginMethod, setLoginMethod] = useState('otp')
  const [showPassword, setShowPassword] = useState(false)
  const [imageMethod, setImageMethod] = useState('upload') // 'upload' or 'capture'
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [imageFileName, setImageFileName] = useState("") // Stores random filename
  const webcamRef = useRef(null)

  // Handle login method toggle
  const toggleLoginMethod = () => {
    if (loginMethod === 'otp') {
      setLoginMethod('face')
    } else {
      setLoginMethod('otp')
    }
  }

  useEffect(() => {
    // Reset camera and image when switching to OTP login
    if (loginMethod === 'otp') {
      setCapturedImage(null) // Reset captured image
      setImageFileName("") // Reset image filename
      setCameraActive(false) // Deactivate camera
    }
  }, [loginMethod]); // Run this effect whenever loginMethod changes

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Handle image method selection (Upload or Capture)
  const handleImageMethodChange = (method) => {
    setImageMethod(method)
    setCapturedImage(null) // Reset captured image
    setImageFileName("") // Reset filename
    if (method === 'capture') {
      setCameraActive(true)
    } else {
      setCameraActive(false)
    }
  }

  const generateRandomFileName = () => {
    return `capturedImage${Math.floor(Math.random() * 10000)}.jpg`
  }

  // Capture image via webcam
  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot() // Capture image
      const randomFileName = generateRandomFileName() // Generate random filename
      setCapturedImage(imageSrc) // Store captured image
      setImageFileName(randomFileName) // Save generated filename
    }
  }, [webcamRef])

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page refresh on form submission
  }

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
            <form className="w-full flex-shrink-0" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
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
                <Button className="w-full">Send OTP</Button>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input id="otp" type="text" placeholder="Enter OTP" />
                </div>
              </div>
            </form>

            {/* Face Login Form */}
            <form className="w-full flex-shrink-0" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faceEmail">Email</Label>
                  <Input id="faceEmail" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faceRole">Role</Label>
                  <Select>
                    <SelectTrigger id="faceRole">
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
              </div>
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button className="w-full mb-2">
          {loginMethod === 'otp' ? "Verify OTP & Login" : "Login with Face Recognition"}
        </Button>
        <Button variant="link" className="w-full">
          Forgot Password?
        </Button>
      </CardFooter>
    </Card>
  )
}
