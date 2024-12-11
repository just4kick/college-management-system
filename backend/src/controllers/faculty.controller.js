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

const viewDeptStudents = asyncHandler(async (req, res) => {
  console.log("Starting viewDeptStudents");

  let { page = 1, limit = 10 } = req.body;

  console.log("Page:", page, "Limit:", limit);

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const deptID = req.user?.department;

  if (!mongoose.Types.ObjectId.isValid(deptID)) {
    console.log("Invalid department ID");
    throw new ApiError(400, "Invalid department ID");
  }

  try {
    console.log("Running aggregation");
    const students = await Student.aggregate([
      {
        $match: { department: new mongoose.Types.ObjectId(deptID) },
      },
      {
        $group: {
          _id: { course: "$course", year: "$year" },
          students: {
            $push: {
              name: "$fullName",
              email: "$email",
              phone: "$phoneNumber",
            },
          },
          totalStudents: { $sum: 1 },
        },
      },
      { $sort: { "_id.course": 1, "_id.year": 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, students, "Data fetched successfully."));
  } catch (error) {
    console.error("Error in aggregation:", error.message);
    throw new ApiError(
      500,
      error.message,
      "Something went wrong while fetching students"
    );
  }
});
// .select("-password -refreshToken -faceEmbedding");
const updateFacultyDetails = asyncHandler(async (req, res) => {
  try {
    // Fetch the faculty record using the user ID
    const faculty = await Faculty.findById(req.user?._id).select("-refreshToken -password");
    if (!faculty) {
      throw new ApiError(404, "Faculty data not found.");
    }

    // Handle avatar file upload if provided
    const avatarLocalPath = req.file?.path;
    if (avatarLocalPath) {
      const avatar = await uploadOnCloudinary(avatarLocalPath);
      if (avatar) {
        faculty.avatar = avatar.url; // Update the avatar URL
      }
    }

    // Dynamically update fields from the request body
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && key !== "avatar") {
        faculty[key] = req.body[key];
      }
    });

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

  // checking the faculty key is registered or not,if not he cant be able to register himself
  const isActiveFacultyKey = await Key.findOne({
    departmentId: dept?._id,
    "facultyKeys.key": phoneNumber,
    "facultyKeys.isActive": true,
  });

  const matchingKey = isActiveFacultyKey?.facultyKeys.find(
    (keyObj) => keyObj.key === phoneNumber && keyObj.isActive === true
  );
  //   console.log(matchingKey)
  if (!matchingKey.isActive) {
    throw new ApiError(402, "You are not authorized to register Yourself. ");
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
  });

  if (!faculty) {
    throw new ApiError(500, "Faculty registration failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, faculty, "Faculty registraion completed."));
});
//All faculties can do
const registerStudent = asyncHandler(async (req, res) => {
  // TODO: Implement registerStudent

  const {
    fullName,
    email,
    phoneNumber,
    password,
    course,
    year,
    session,
  } = req.body;
  if (
    [
      fullName,
      email,
      phoneNumber,
      password,
      course,
      year,
      session,
    ].some((field) => field?.trim() === "")
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

  const avatarLocalPath = req.files?.avatar[0].path;
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const cameraImageLocalPath = req.files?.cameraImage[0].path;
  const faceEmbedding = await generateFaceEncoding(cameraImageLocalPath);

  const student = await Student.create({
    fullName,
    email,
    phoneNumber,
    avatar: avatar.url,
    password,
    faceEmbedding,
    isFaceRegistered: true,
    course,
    year,
    session,
    department: req.user?.department,
  });

  if (!student) {
    throw new ApiError(500, "Student registration failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student registraion completed."));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  try {
    await Student.deleteOne({ email,department:req.user?.department });
  } catch (error) {
    throw new ApiError(500, error, "Something went wrong");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Deletion Successfully."));
});

const searchStudent = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const student = await Student.findOne({ email,department:req.user?.department }).select("-password -refreshToken -faceEmbedding")
    .select("-password -faceEmbedding -refreshToken")
    .populate("department", "name");

  if (!student) {
    throw new ApiError(500, "User is not Available");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, student, "Search Completed with result"));
});
//ends here
const viewAllStudent = asyncHandler(async (req, res) => {
  // TODO: Implement registerStudent
  try {
    
    const allStudent = await Student.find({department:req.user?.department}).select("-password -refreshToken -faceEmbedding")

    if (!allStudent) {
      throw new ApiError(500, "Something went Wrong During Fetching Data");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, allStudent, "Data Fetched Completed"));
  } catch (error) {
    throw new ApiError(400, error, "Something went Wrong During Fetching Data");
  }
});

export { viewDeptStudents, updateFacultyDetails, selfRegisterFaculty,registerStudent,
    deleteStudent,
    searchStudent,
    viewAllStudent,
 };
