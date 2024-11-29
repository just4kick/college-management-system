import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";



const secondaryAuthSetup = asyncHandler(async (req, res) => {
    // TODO: Implement secondaryAuthSetup
});

const secondaryAuthVerify = asyncHandler(async (req, res) => {
    // TODO: Implement secondaryAuthVerify
});

const getUserRole = asyncHandler(async (req, res) => {
    // TODO: Implement getUserRole
});

export {
    register,
    secondaryAuthSetup,
    secondaryAuthVerify,
    getUserRole
};
