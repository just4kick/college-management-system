"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Webcam from "react-webcam";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "react-router-dom";
export default function SignupCard() {
  const [userType, setUserType] = useState("faculty");
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoadingFaculty, setIsLoadingFaculty] = useState(false);
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);
  const [facultyData, setFacultyData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deptId: "",
    avatar: null,
    cameraImage: null,
    password: "",
  });
  const [studentData, setStudentData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deptId: "",
    course: "",
    year: "",
    session: "",
    avatar: null,
    cameraImage: null,
    password: "",
  });

  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (userType === "faculty") {
      setFacultyData({ ...facultyData, cameraImage: imageSrc });
    } else {
      setStudentData({ ...studentData, cameraImage: imageSrc });
    }
    setCameraActive(false);
  };

  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    setIsLoadingFaculty(true);

    try {
      const formData = new FormData();
      Object.keys(facultyData).forEach((key) => {
        if (key === "cameraImage" && facultyData[key]) {
          const blob = dataURLToBlob(facultyData[key]);
          formData.append("cameraImage", blob, "webcam.jpg");
        } else if (key === "avatar" && facultyData[key]) {
          formData.append("avatar", facultyData[key]);
        } else {
          formData.append(key, facultyData[key]);
        }
      });

      const response = await fetch(
        "http://localhost:8000/api/v1/faculty/self-register-faculty",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Faculty registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    } finally {
      setIsLoadingFaculty(false);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingStudent(true);

    try {
      const formData = new FormData();
      Object.keys(studentData).forEach((key) => {
        if (key === "cameraImage" && studentData[key]) {
          const blob = dataURLToBlob(studentData[key]);
          formData.append("cameraImage", blob, "webcam.jpg");
        } else if (key === "avatar" && studentData[key]) {
          formData.append("avatar", studentData[key]);
        } else {
          formData.append(key, studentData[key]);
        }
      });

      const response = await fetch(
        "http://localhost:8000/api/v1/student/self-register-student",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Student registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    } finally {
      setIsLoadingStudent(false);
    }
  };
  // Reset fields when switching between Faculty and Student
  const resetFields = () => {
    setCameraActive(false);
    if (userType === "faculty") {
      setFacultyData({
        fullName: "",
        email: "",
        phoneNumber: "",
        department: "",
        avatar: null,
        cameraImage: null,
        password: "",
      });
    } else {
      setStudentData({
        fullName: "",
        email: "",
        phoneNumber: "",
        department: "",
        course: "",
        year: "",
        session: "",
        avatar: null,
        cameraImage: null,
        password: "",
      });
    }
  };

  // Handle user type switch
  const handleUserTypeSwitch = (type) => {
    setUserType(type);
    resetFields();
  };

  return (
    <Card className="w-[800px] max-w-full overflow-hidden justify-center">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          {userType === "faculty"
            ? "Faculty registration with avatar and face recognition."
            : "Student registration with avatar and face recognition."}
        </CardDescription>
        <div className="flex justify-between mt-4">
          <Button
            variant={userType === "faculty" ? "default" : "outline"}
            onClick={() => handleUserTypeSwitch("faculty")}
          >
            Faculty
          </Button>
          <Button
            variant={userType === "student" ? "default" : "outline"}
            onClick={() => handleUserTypeSwitch("student")}
          >
            Student
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-6"
          onSubmit={
            userType === "faculty" ? handleFacultySubmit : handleStudentSubmit
          }
        >
          <div className="space-y-6 sm:space-y-4 sm:col-span-1">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={
                  userType === "faculty"
                    ? facultyData.fullName || ""
                    : studentData.fullName || ""
                }
                onChange={(e) =>
                  userType === "faculty"
                    ? setFacultyData({
                        ...facultyData,
                        fullName: e.target.value,
                      })
                    : setStudentData({
                        ...studentData,
                        fullName: e.target.value,
                      })
                }
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={
                  userType === "faculty" ? facultyData.email || "" : studentData.email || ""
                }
                onChange={(e) =>
                  userType === "faculty"
                    ? setFacultyData({ ...facultyData, email: e.target.value })
                    : setStudentData({ ...studentData, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                value={
                  userType === "faculty"
                    ? facultyData.phoneNumber || ""
                    : studentData.phoneNumber || ""
                }
                onChange={(e) =>
                  userType === "faculty"
                    ? setFacultyData({
                        ...facultyData,
                        phoneNumber: e.target.value,
                      })
                    : setStudentData({
                        ...studentData,
                        phoneNumber: e.target.value,
                      })
                }
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deptId">Department ID</Label>
              <Input
                id="deptId"
                type="text"
                value={
                  userType === "faculty"
                    ? facultyData.deptId || ""
                    : studentData.deptId || ""
                }
                onChange={(e) =>
                  userType === "faculty"
                    ? setFacultyData({
                        ...facultyData,
                        deptId: e.target.value,
                      })
                    : setStudentData({
                        ...studentData,
                        deptId: e.target.value,
                      })
                }
                placeholder="Enter your department ID"
              />
            </div>
            {userType === "student" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    type="text"
                    value={studentData.course || ""}
                    onChange={(e) =>
                      setStudentData({ ...studentData, course: e.target.value })
                    }
                    placeholder="Enter your course"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="text"
                    value={studentData.year || ""}
                    onChange={(e) =>
                      setStudentData({ ...studentData, year: e.target.value })
                    }
                    placeholder="Enter your year"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session">Session</Label>
                  <Input
                    id="session"
                    type="text"
                    value={studentData.session || ""}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        session: e.target.value,
                      })
                    }
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
                value={
                  userType === "faculty"
                    ? facultyData.password || ""
                    : studentData.password || ""
                }
                onChange={(e) =>
                  userType === "faculty"
                    ? setFacultyData({
                        ...facultyData,
                        password: e.target.value,
                      })
                    : setStudentData({
                        ...studentData,
                        password: e.target.value,
                      })
                }
                placeholder="Enter your password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUpload">Upload Avatar</Label>
              <Input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="block w-full"
                onChange={(e) => {
                  if (userType === "faculty") {
                    setFacultyData({
                      ...facultyData,
                      avatar: e.target.files[0],
                    });
                  } else {
                    setStudentData({
                      ...studentData,
                      avatar: e.target.files[0],
                    });
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Button
                type="button"
                onClick={() => setCameraActive(!cameraActive)}
              >
                {cameraActive ? "Stop Camera" : "Start Camera"}
              </Button>
              {cameraActive && (
                <div className="mt-2">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "user" }}
                    width="100%"
                  />
                </div>
              )}
              <Button
                type="button"
                onClick={handleCapture}
                disabled={!cameraActive}
              >
                Capture Image
              </Button>
            </div>
            {(facultyData.cameraImage || studentData.cameraImage) && (
              <div className="mt-2">
                <p className="text-sm">Captured Image Preview</p>
                <img
                  src={facultyData.cameraImage || studentData.cameraImage}
                  alt="Captured"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={
                userType === "faculty" ? isLoadingFaculty : isLoadingStudent
              }
            >
              {userType === "faculty" ? (
                isLoadingFaculty ? (
                  <Spinner />
                ) : (
                  "Register as Faculty"
                )
              ) : isLoadingStudent ? (
                <Spinner />
              ) : (
                "Register as Student"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
