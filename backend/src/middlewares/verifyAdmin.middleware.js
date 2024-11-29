import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.models.js";

export const verifyAdmin = asyncHandler(async(req,res,next)=>{
    try {
        const isAdmin = await Admin.findById(req.user._id);
        if(!isAdmin){
            throw new ApiError(400,"Unauthorized access requested")
        }
        next();
    } catch (error) {
        throw new ApiError(400,"Something went wrong during admin Verifiaction.")
        
    }
})