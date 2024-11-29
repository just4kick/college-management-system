import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";
import { Faculty } from "../models/faculty.models.js";
import { Student } from "../models/student.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Decode the JWT token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Determine which model to query based on the user role
        let user;
        if (decodedToken?.role === 'admin') {
            user = await Admin.findById(decodedToken._id).select("-password -refreshToken");
        } else if (decodedToken?.role === 'faculty') {
            user = await Faculty.findById(decodedToken._id).select("-password -refreshToken");
        } else if (decodedToken?.role === 'student') {
            user = await Student.findById(decodedToken._id).select("-password -refreshToken");
        }

        // If user is not found, throw an error
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});
