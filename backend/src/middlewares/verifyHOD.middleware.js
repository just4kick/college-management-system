import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Faculty } from "../models/faculty.models.js";

export const verifyHOD = asyncHandler(async(req,res,next)=>{
    try {
        const user = await Faculty.findById(req.user._id);
        const isHOD = user.isHOD
        if(!isHOD){
            throw new ApiError(400,"Unauthorized access requested")
        }
        next();
    } catch (error) {
        throw new ApiError(400,"Something went wrong during admin Verifiaction.")
        
    }
})