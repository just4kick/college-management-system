import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Notice } from "../models/notice.models.js"
import { Faculty } from "../models/faculty.models.js"
import{generateFaceEncoding} from "../services/faceRecognition.service.js"

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
        department:req.user?.department,
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

const removeNoticeByHOD = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Validate input
    if (!id) {
        throw new ApiError(400, "Notice ID is required.");
    }

    // Fetch the notice
    const notice = await Notice.findById(id).populate('createdBy', '_id fullName');

    // If the notice does not exist, return an error
    if (!notice) {
        throw new ApiError(404, "Notice not found.");
    }

    // Ensure the logged-in user is the creator of the notice
    if (!notice.createdBy._id.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to delete this notice.");
    }

    // Proceed to delete the notice
    await notice.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, {}, "Notice deleted successfully.")
    );
});


const viewAllNotice = asyncHandler(async (req,res)=>{
    //TODO: Implement notice 
    let allNotices
    // const globalNotices = await Notice.find({ isGlobal: true }).populate('createdBy _id name');
    try {
        allNotices = await Notice.find({
            department: req.user.department,
        })
            .populate('createdBy', '_id fullName')
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new ApiError(500,error,"Something went wrong.")
    }
    return res.status(200).json(
        new ApiResponse(200,allNotices,"Notice fetched succesfull")
    )
});

/// HOD Specific TASK 
const registerFaculty = asyncHandler(async (req, res) => {
    // TODO: Implement registerFaculty
    const {fullName,email,phoneNumber,password} = req.body
    if(
        [fullName,email,phoneNumber,password].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    function isValidPhone(phoneNumber) {
        return phoneNumber.length === 10;
    }
    
    if(!isValidPhone(phoneNumber)){
        throw new ApiError(401,"Phone Number must be of 10 digits.")
    }
    function isValidEmail(email){
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if(!isValidEmail(email)){
        throw new ApiError(400,"Not a vaild Email!")
    }

    const avatarLocalPath = req.files?.avatar[0].path
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const cameraImageLocalPath = req.files?.cameraImage[0].path
    
    const faceEmbedding = await generateFaceEncoding(cameraImageLocalPath)

    const faculty = await Faculty.create({
        fullName,
        email,
        phoneNumber,
        avatar:avatar.url,
        password,
        faceEmbedding,
        isFaceRegistered:true,
        department:req.user?.department,
    })

    if(!faculty){
        throw new ApiError(500,"Faculty registration failed")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,faculty,"Faculty registraion completed.")
            )

});

const deleteFaculty = asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    try {
        await Faculty.deleteOne(
            {email,department:req.user?.department}
        )
    } catch (error) {
        throw new ApiError(500,error,"Something went wrong")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,{},"Deletion Successfully.")
            )
});

const searchFaculty = asyncHandler(async(req,res)=>{
    const {email} = req.query
    if(!email){
        throw new ApiError(400,"Email is required")
    }

    const faculty = await Faculty.findOne({email,department:req.user?.department})
    .select("-password -faceEmbedding -refreshToken")
    .populate("department","name")

    if(!faculty){
        throw new ApiError(500,"User is not Available")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,faculty,"Search Completed with result")
            )
});
//ends here
const viewAllFaculty = asyncHandler(async (req, res) => {
    // TODO: Implement registerStudent
    // console.log(req.user?.department)
    try {
        
        const allFaculties = await Faculty.find({department:req.user?.department}).select("-password -refreshToken -faceEmbedding")
        
        if(!allFaculties){
            throw new ApiError(500,"Something went Wrong During Fetching Data")
        }

        return res
                .status(200)
                .json(
                    new ApiResponse(200,allFaculties,"Data Fetched Completed")
                )
    } catch (error) {
        throw new ApiError(400,error,"Something went Wrong During Fetching Data")
    }
});


export {
    addNoticeByHOD,
    removeNoticeByHOD,
    viewAllNotice,
    registerFaculty,
    deleteFaculty,
    searchFaculty,
    viewAllFaculty
};
