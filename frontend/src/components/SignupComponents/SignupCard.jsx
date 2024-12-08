'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Webcam from 'react-webcam'

export default function SignupCard() {
  const [userType, setUserType] = useState('faculty')
  const [cameraActive, setCameraActive] = useState(false)

  const [facultyData, setFacultyData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "",
    avatar: "", 
    cameraImage: "", 
    password: "",
  })


  const [studentData, setStudentData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "",
    course: "",
    year: "",
    session: "",
    avatar: "", 
    cameraImage: "", 
    password: "",
  })

  // Reference for webcam
  const webcamRef = useRef(null)

  const handleFacultySubmit = (e) => {
    e.preventDefault()
    console.log('Faculty Data:', facultyData)
  }

  const handleStudentSubmit = (e) => {
    e.preventDefault()
    console.log('Student Data:', studentData)
  }

  // Capturing  image from webcam
  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (userType === 'faculty') {
        setFacultyData({ ...facultyData, cameraImage: imageSrc })
      } else {
        setStudentData({ ...studentData, cameraImage: imageSrc })
      }
    }
  }, [webcamRef, facultyData, studentData, userType])

  // Reset fields when switching between Faculty and Student
  const resetFields = () => {
    setCameraActive(false)
    if (userType === 'faculty') {
      setFacultyData({
        fullName: "",
        email: "",
        phoneNumber: "",
        department: "",
        avatar: "",
        cameraImage: "",
        password: "",
      })
    } else {
      setStudentData({
        fullName: "",
        email: "",
        phoneNumber: "",
        department: "",
        course: "",
        year: "",
        session: "",
        avatar: "",
        cameraImage: "",
        password: "",
      })
    }
  }

  // Handle user type switch
  const handleUserTypeSwitch = (type) => {
    setUserType(type)
    resetFields()
  }

  return (
    <Card className="w-[800px] max-w-full overflow-hidden justify-center">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          {userType === 'faculty' ? "Faculty registration with avatar and face recognition." : "Student registration with avatar and face recognition."}
        </CardDescription>
        <div className="flex justify-between mt-4">
          <Button 
            variant={userType === 'faculty' ? 'default' : 'outline'}
            onClick={() => handleUserTypeSwitch('faculty')}
          >
            Faculty
          </Button>
          <Button 
            variant={userType === 'student' ? 'default' : 'outline'}
            onClick={() => handleUserTypeSwitch('student')}
          >
            Student
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form 
          className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-6" 
          onSubmit={userType === 'faculty' ? handleFacultySubmit : handleStudentSubmit}
        >
          <div className="space-y-6 sm:space-y-4 sm:col-span-1">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                type="text" 
                value={userType === 'faculty' ? facultyData.fullName : studentData.fullName}
                onChange={(e) => 
                  userType === 'faculty' 
                    ? setFacultyData({ ...facultyData, fullName: e.target.value }) 
                    : setStudentData({ ...studentData, fullName: e.target.value })}
                placeholder="Enter your full name" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={userType === 'faculty' ? facultyData.email : studentData.email}
                onChange={(e) => 
                  userType === 'faculty' 
                    ? setFacultyData({ ...facultyData, email: e.target.value }) 
                    : setStudentData({ ...studentData, email: e.target.value })}
                placeholder="Enter your email" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                type="text" 
                value={userType === 'faculty' ? facultyData.phoneNumber : studentData.phoneNumber}
                onChange={(e) => 
                  userType === 'faculty' 
                    ? setFacultyData({ ...facultyData, phoneNumber: e.target.value }) 
                    : setStudentData({ ...studentData, phoneNumber: e.target.value })}
                placeholder="Enter your phone number" 
              />
            </div>
            {userType === 'faculty' && (
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department" 
                  type="text" 
                  value={facultyData.department}
                  onChange={(e) => setFacultyData({ ...facultyData, department: e.target.value })}
                  placeholder="Enter your department" 
                />
              </div>
            )}
            {userType === 'student' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department" 
                    type="text" 
                    value={studentData.department}
                    onChange={(e) => setStudentData({ ...studentData, department: e.target.value })}
                    placeholder="Enter your department" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input 
                    id="course" 
                    type="text" 
                    value={studentData.course}
                    onChange={(e) => setStudentData({ ...studentData, course: e.target.value })}
                    placeholder="Enter your course" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input 
                    id="year" 
                    type="text" 
                    value={studentData.year}
                    onChange={(e) => setStudentData({ ...studentData, year: e.target.value })}
                    placeholder="Enter your year" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session">Session</Label>
                  <Input 
                    id="session" 
                    type="text" 
                    value={studentData.session}
                    onChange={(e) => setStudentData({ ...studentData, session: e.target.value })}
                    placeholder="Enter your session" 
                  />
                </div>
              </>
            )}
          </div>
          <div className="space-y-6 sm:space-y-4 sm:col-span-1">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={userType === 'faculty' ? facultyData.password : studentData.password}
                onChange={(e) => 
                  userType === 'faculty' 
                    ? setFacultyData({ ...facultyData, password: e.target.value }) 
                    : setStudentData({ ...studentData, password: e.target.value })}
                placeholder="Enter your password" 
              />
            </div>

            {/* Avatar Upload */}
            <div className="space-y-2">
              <Label htmlFor="avatarUpload">Upload Avatar</Label>
              <Input 
                id="avatarUpload" 
                type="file" 
                accept="image/*"
                className="block w-full" 
                onChange={(e) => {
                  if (userType === 'faculty') {
                    setFacultyData({ ...facultyData, avatar: e.target.files[0] })
                  } else {
                    setStudentData({ ...studentData, avatar: e.target.files[0] })
                  }
                }} 
              />
            </div>

            {/* Camera Capture */}
            <div className="space-y-2">
              <Button type="button" onClick={() => setCameraActive(!cameraActive)}>
                {cameraActive ? 'Stop Camera' : 'Start Camera'}
              </Button>
              {cameraActive && (
                <div className="mt-2">
                  <Webcam 
                    audio={false} 
                    ref={webcamRef} 
                    screenshotFormat="image/jpeg" 
                    videoConstraints={{ facingMode: 'user' }} 
                    width="100%" 
                  />
                </div>
              )}
              <Button 
                type="button" 
                onClick={captureImage}
                disabled={!cameraActive}
              >
                Capture Image
              </Button>
            </div>

            {/* Display Captured Image */}
            {(facultyData.cameraImage || studentData.cameraImage) && (
              <div className="mt-2">
                <p className="text-sm">Captured Image Preview</p>
                <img src={facultyData.cameraImage || studentData.cameraImage} alt="Captured" className="w-full h-48 object-cover" />
              </div>
            )}

            <Button 
              type="submit" 
              className="mt-4 w-full"
            >
              {userType === 'faculty' ? "Register as Faculty" : "Register as Student"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
