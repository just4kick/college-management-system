import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateFaceEncoding } from "../services/faceRecognition.service.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Student } from "../models/student.models.js";
import { Department } from "../models/dept.models.js";
import { Faculty } from "../models/faculty.models.js";
import { Key } from "../models/regkey.models.js";
import crypto from 'crypto';
import { sendVerificationEmail } from "../services/email.service.js";

// .select("-password -refreshToken -faceEmbedding");
const updateFacultyDetails = asyncHandler(async (req, res) => {
  const { email, fullName, newEmail, phoneNumber, deptId } = req.body;

  console.log(newEmail)
  try {
    // Fetch the faculty record using the email
    const faculty = await Faculty.findOne({ email }).select("-refreshToken -password");
    if (!faculty) {
      throw new ApiError(404, "Faculty data not found.");
    }
    // Check for duplicate email if newEmail is provided and different from the current email
    // if (newEmail && newEmail !== email) {
    //   const existingFaculty = await Faculty.findOne({ email: newEmail });
    //   if (existingFaculty) {
    //     throw new ApiError(400, "Email already exists.");
    //   }
    //   faculty.email = newEmail;
    // }

    // Update fields from the request body if they are provided
    if (fullName) faculty.fullName = fullName;
    if (phoneNumber) faculty.phoneNumber = phoneNumber;

    // Update department if deptId is provided
    if (deptId) {
      const department = await Department.findOne({ deptId });
      if (!department) {
        throw new ApiError(404, "Department not found.");
      }
      faculty.department = department._id;
    }

    // Save the updated faculty record
    await faculty.save();

    return res
      .status(200)
      .json(new ApiResponse(200, faculty, "Faculty profile updated successfully."));
  } catch (error) {
    console.error("Error updating faculty:", error);
    throw new ApiError(500, "Failed to update faculty profile.");
  }
});

const selfRegisterFaculty = asyncHandler(async (req, res) => {
  // TODO: Implement viewDeptStudents
  const { fullName, email, phoneNumber, password, deptId } = req.body;
  if (
    [fullName, email, phoneNumber, password, deptId].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  function isValidPhone(phoneNumber) {
    return phoneNumber.length === 10;
  }

  if (!isValidPhone(phoneNumber)) {
    throw new ApiError(401, "Phone Number must be of 10 digits.");
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Not a vaild Email!");
  }
  const dept = await Department.findOne({ deptId });
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationExpiry = new Date(Date.now() + 24*60*60*1000);
  // checking the faculty key is registered or not,if not he cant be able to register himself
  const isActiveFacultyKey = await Key.findOne({
    departmentId: dept?._id,
    "facultyKeys.key": email,
    "facultyKeys.isActive": true,
});

if (!isActiveFacultyKey) {
  return res
    .status(401)
    .json(new ApiResponse(401, {}, "You are not authorized to register. No active key found."));
}

  const avatarLocalPath = req.files?.avatar[0].path;
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // console.log(avatar)
  const cameraImageLocalPath = req.files?.cameraImage[0].path;
  const faceEmbedding = await generateFaceEncoding(cameraImageLocalPath);

  const faculty = await Faculty.create({
    fullName,
    email,
    phoneNumber,
    avatar: avatar.url,
    password,
    faceEmbedding,
    isFaceRegistered: true,
    department: dept?._id,
    emailVerificationToken: verificationToken,
    emailVerificationExpiry: verificationExpiry,
    isEmailVerified: false,
  });

  if (!faculty) {
    throw new ApiError(500, "Faculty registration failed");
  }
  const temp = await sendVerificationEmail(email,verificationToken,'faculty')
  console.log("Email verifiaction controller",temp);
  
  return res
    .status(200)
    .json(new ApiResponse(200, faculty, "Faculty registraion completed."));
});
//All faculties can do


export {  updateFacultyDetails, selfRegisterFaculty};
