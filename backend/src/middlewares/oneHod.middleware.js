import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Faculty } from "../models/faculty.models.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { Department } from "../models/dept.models.js"

export const hodExists = asyncHandler(async(req,res,next)=>{
    const {deptId} = req.body
    const result = await Department.findOne({deptId})
    if(result.HOD !== null){
        return res.status(505).json(
            new ApiResponse(200,{},"HOD is already assigned to this department")
        )
    }
    next()
})