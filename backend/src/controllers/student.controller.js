import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const viewPersonalDetails = asyncHandler(async (req, res) => {
    // TODO: Implement viewPersonalDetails
});

const updatePersonalDetails = asyncHandler(async (req, res) => {
    // TODO: Implement updatePersonalDetails
});

export {
    viewPersonalDetails,
    updatePersonalDetails
};
