import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import{generateOtp,
    verifyOtp} from "../services/otp.service.js"
import{generateFaceEncoding,
    verifyFaceEncoding,
    verifyAndRespond,} from "../services/faceRecognition.service.js"
import {Admin} from "../models/admin.models.js"
import {Faculty} from "../models/faculty.models.js"
import {Student} from "../models/student.models.js"
import fs from "fs"
import axios from "axios"
import FormData from 'form-data';




const generateAccessAndRefreshTokens = async (userId,role)=>{
        try {
            const user = await role.findById(userId)
            const accessToken=user.generateAccessToken()
            const refreshToken=user.generateRefreshToken()
    
            user.refreshToken = refreshToken
            await user.save({validateBeforeSave:false})
            return {accessToken,refreshToken}
        } catch (error) {
            throw new ApiError(500,"Something went wrong while generating token-Hamari galti hai")
        }
}

const roleModelMap = {
        admin: Admin,
        student: Student,
        faculty: Faculty,
};

const loginRequestOtp = asyncHandler(async (req, res) => {
    // TODO: Implement login

    const {email,password,role}=req.body
    if(!email && !role){
        throw new ApiError(400,"Email and role is required")
    }
    const userRole = roleModelMap[role.toLowerCase()];
    if (!userRole) {
        throw new ApiError(400, "Invalid role. Must be 'Admin', 'Student', or 'Faculty'");
    }
    const user = await userRole.findOne({email})
    if(!user){
        throw new ApiError(404,"User does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user crediantials")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id,userRole)
    

    const options = {
        httpOnly: true,
        secure: true,
    }
    if(!generateOtp(email)){
        throw new ApiError(500,"OTP generation Failed")
    }


    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: accessToken,refreshToken
            },
            "OTP generation succesfully"
        )
    )


});

const loginVerifyOtp = asyncHandler(async (req, res) => {
    // TODO: Implement login

    const {otp,role}=req.body
    if(!otp && !role){
        throw new ApiError(400,"otp and role is required")
    }
    const userRole = roleModelMap[role.toLowerCase()];
    if (!userRole) {
        throw new ApiError(400, "Invalid role. Must be 'Admin', 'Student', or 'Faculty'");
    }
    const loggedInUser = await userRole.findById(req.user?._id).select("-password -refreshToken")
    const email = loggedInUser.email
    if(!verifyOtp(email,otp)){
        throw new ApiError(400,"OTP is Wrong")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser
            },
            "OTP Verification SuccessFul"
        )
    )
});

const faceRecognitionLogin = asyncHandler(async (req, res) => {
    // TODO: Implement faceRecognitionLogin
    const {email,role}=req.body
    if(!email && !role){
        throw new ApiError(400,"Email and role is required")
    }
    const userRole = roleModelMap[role.toLowerCase()];
    if (!userRole) {
        throw new ApiError(400, "Invalid role. Must be 'Admin', 'Student', or 'Faculty'");
    }

    const user = await userRole.findOne({email})
    const cameraLocalPath = req.file?.path
    if(!cameraLocalPath){
        throw new ApiError(400,"Camera Image is required")
    }
    const faceEmbeddings = user.faceEmbedding;
    console.log(faceEmbeddings)

    //verifying the face encodings from database and the from the frontend
    try{
        const formData = new FormData();
        formData.append('image',fs.createReadStream(cameraLocalPath));
        formData.append('referenceEncoding',JSON.stringify(faceEmbeddings))
        formData.append('threshold','0.7');
        // console.log(formData)
        const pythonApiUrl = "http://127.0.0.1:5000/api/verify-encoding";
        const response = await axios.post(pythonApiUrl,formData,{
            headers:{
                ...formData.getHeaders(),
            },
        })
        const {isMatch,distance}=response.data

        if(isMatch){
            return res
            .status(200)
            .json(
                new ApiResponse(200,{distance},"Face recognized succesfully.")
            )
        }else{
            throw new ApiError(401,"Face does not match. Bhaag yha se")
        }
    }catch(error){
        throw new ApiError(500,`Face recognition failed: ${error.response?.data?.error || error.message}`)
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    // TODO: Implement changePassword
    const {oldPassword,newPassword}=req.body
    const user = req.user

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400,"Old password is mismatched. Try again")
    }
    user.password = newPassword
    user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200),{},"password Changed Succesfully.")
});

const logout = asyncHandler(async (req, res) => {
    // TODO: Implement logout
    const user = req.user
    await user.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accesToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))
});

const requestForgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new ApiError(400,"Email is Empty")
    }
    if(!generateOtp(email)){
        throw new ApiResponse(500,"OTP generation Failed")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,{email},"OTP generation successfull.")
            )
});

const resetPassword = asyncHandler(async(req,res)=>{
    const {otp,newPassword,role,email}=req.body
    if(!otp && !role){
        throw new ApiError(400,"otp and role is required")
    }
    const userRole = roleModelMap[role.toLowerCase()];
    if (!userRole) {
        throw new ApiError(400, "Invalid role. Must be 'Admin', 'Student', or 'Faculty'");
    }
    const loggedInUser = await userRole.findOne({email}).select("-password -refreshToken")
    if(!verifyOtp(email,otp)){
        throw new ApiError(400,"OTP is Wrong")
    }
    userRole.password=newPassword
    await userRole.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser
            },
            "Password Changed SuccessFully"
        )
    )
})


export {
    loginRequestOtp,
    loginVerifyOtp,
    faceRecognitionLogin,
    changeCurrentPassword,
    logout,
    requestForgotPassword,
    resetPassword,
    registerUser,
};
