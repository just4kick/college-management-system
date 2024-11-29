import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const viewDeptUsers = asyncHandler(async (req, res) => {
    // TODO: Implement viewDeptUsers
});

const updateFacultyDetails = asyncHandler(async (req, res) => {
    // TODO: Implement updateFacultyDetails
});

const updateStudentDetails = asyncHandler(async (req, res) => {
    // TODO: Implement updateStudentDetails
});

const registerFacultyInDept = asyncHandler(async (req, res) => {
    // TODO: Implement registerFacultyInDept
});

const registerStudentInDept = asyncHandler(async (req, res) => {
    // TODO: Implement registerStudentInDept
});

const deleteFaculty = asyncHandler(async (req, res) => {
    // TODO: Implement deleteFaculty
});

const deleteStudent = asyncHandler(async (req, res) => {
    // TODO: Implement deleteStudent
});

const addNotice = asyncHandler(async (req,res)=>{
    //TODO: Implement notice bt HOD
})

export {
    viewDeptUsers,
    updateFacultyDetails,
    updateStudentDetails,
    registerFacultyInDept,
    registerStudentInDept,
    deleteFaculty,
    deleteStudent,
    addNotice
};
