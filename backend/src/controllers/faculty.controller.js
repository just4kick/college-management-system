import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const viewDeptStudents = asyncHandler(async (req, res) => {
    // TODO: Implement viewDeptStudents
});

const updateStudentDetailsByFaculty = asyncHandler(async (req, res) => {
    // TODO: Implement updateStudentDetailsByFaculty
});

const viewStudentDetails = asyncHandler(async (req, res) => {
    // TODO: Implement viewStudentDetails
});

export {
    viewDeptStudents,
    updateStudentDetailsByFaculty,
    viewStudentDetails
};
