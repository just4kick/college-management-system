import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Notice } from "../models/notice.models.js"
import { Faculty } from "../models/faculty.models.js"


const addNoticeByHOD = asyncHandler(async (req,res)=>{
    //TODO: Implement notice 
    const {title,content} = req.body
    if(
        [title,content].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    const notice = await Notice.create({
        title,
        content,
        createdBy: req.user?._id,
        createdByModel:'Faculty',
        department:null,
        isGlobal:false,
    })
    if(!notice){
        throw new ApiError(500,"Notice Creation Failed")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,notice,"Notice Added")
            )
});

const removeNoticeByHOD = asyncHandler(async (req,res)=>{
    //TODO: remove notice by admin
        const { id } = req.body; 
        
        if (!id) {
            throw new ApiError(400, "Notice ID is required.");
        }
        const notice = await Notice.findByIdAndDelete(id);
        
        if (!notice) {
            throw new ApiError(404, "Notice not found.");
        }
        return res.status(200).json(
             new ApiResponse(200,{},"Notice deleted successfully." )
            );
});

const viewAllNotice = asyncHandler(async (req,res)=>{
    //TODO: Implement notice 

    // const globalNotices = await Notice.find({ isGlobal: true }).populate('createdBy _id name');
    try {
        const allNotices = await Notice.find({
            createdBy:req.user?._id
        }).populate('createdBy _id name')
    } catch (error) {
        throw new ApiError(500,error,"Something went wrong.")
    }
    return res.status(200).json(
        new ApiResponse(200,allNotices,"Notice fetched succesfull")
    )
});

export {
    addNoticeByHOD,
    removeNoticeByHOD,
    viewAllNotice
};
