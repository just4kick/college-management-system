import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import{generateOtp,
    verifyOtp} from "../services/otp.service.js"
import{verifyAndRespond,generateFaceEncoding} from "../services/faceRecognition.service.js"
import {Admin} from "../models/admin.models.js"
import {Faculty} from "../models/faculty.models.js"
import {Student} from "../models/student.models.js";
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

    if (!user.isEmailVerified) {
        return res.status(401).json(new ApiResponse(401,{},"Please verify your email before logging in"))
      }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user crediantials")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id,userRole)
    

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production' ? 'None' : 'Lax',
    }
    if(!generateOtp(email)){
        throw new ApiError(500,"OTP generation Failed")
    }


    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(
            200,
            {},
            `OTP generation succesfully: ${email} `
        )
    )


});

const loginVerifyOtp = asyncHandler(async (req, res) => {
    // TODO: Implement login

    const {otp}=req.body
    const role = req.user?.role
    if(!otp && !role){
        throw new ApiError(400,"otp and role is required")
    }
    const userRole = roleModelMap[role.toLowerCase()];
    if (!userRole) {
        throw new ApiError(400, "Invalid role. Must be 'Admin', 'Student', or 'Faculty'");
    }
    const loggedInUser = await userRole.findById(req.user?._id).select("-password -refreshToken -faceEmbedding")
    const email = loggedInUser.email
    const result = await verifyOtp(email,otp)
    // console.log(result)
    if(result.output){
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
    }else{
        return res
    .status(401)
    .json(
        new ApiResponse(
            401,
            {},`OTP verification Failed: Reason-> ${result.message}`
        )
    )
    }

    
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

    const user = await userRole.findOne({email}).select("-password -refreshToken")
    
    if (!user.isEmailVerified) {
        return res.status(401).json(new ApiResponse(401,{},"Please verify your email before logging in"))
      }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id,userRole)
    const cameraLocalPath = req.file?.path
    if(!cameraLocalPath){
        throw new ApiError(400,"Camera Image is required")
    }
    const faceEmbeddings = user.faceEmbedding
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production' ? 'None' : 'Lax',
    }
        if(await verifyAndRespond(cameraLocalPath,faceEmbeddings)===true){
            return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .json(
                new ApiResponse(200,{user},"Face recognized succesfully.")
            )
        }else{
            throw new ApiError(401,"Face does not match. Bhaag yha se")
        }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    // TODO: Implement changePassword
    const {oldPassword,newPassword}=req.body

    const userRole = req.user?.role
    const model = roleModelMap[userRole]
    if(!model){
        throw new ApiError(400,"Invalid role")
    }
    const user = await model.findById(req.user?._id)

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
    const user = req.user?.role
    const userRole = roleModelMap[user]
    console.log(userRole)
    const result = await userRole.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    ).select("-password -refreshToken -faceEmbedding -avatar")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,result,"User logged out"))
});

const checkAuth = asyncHandler(async(req,res)=>{
   const token = req.cookies.accessToken;
  if (token) {
    return res.status(200).json({ ok: true });
  } else {
    return res.status(401).json({ ok: false });
  }
//    console.log("CheckAuth errors")
//    console.log(token)
//    if(!token){
//     return res.status(401).json(new ApiResponse(401,{},"Token not available"))
//    }
// //    try {
//     const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//     console.log(decoded)
//     const userRole = roleModelMap[decoded.role];
//     console.log(userRole)
//     const user = await userRole.findById(decoded.id).select("-password -refreshToken -faceEmbedding")
//     console.log(user)
//     if(!user){
//         return res.status(401).json(new ApiResponse(401,{},"Not Authenticated"))
//     }
//     return res.status(200).json(new ApiResponse(200, user, "Authenticated"));
//    } catch (error) {
//     return res.status(401).json(new ApiResponse(401,{},"Not Authenticated"))
//    }
})

const requestForgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new ApiError(400,"Email is Empty")
    }
    if(!generateOtp(email)){
        throw new ApiResponse(500,"OTP generation Failed")
    }
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
            },
            `OTP generation succesfully: ${email}`
        )
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

    const result = await verifyOtp(email,otp)
    // console.log(result)
    if(result.output){
    const user = await userRole.findOne({email}).select("-password -refreshToken")
    user.password=newPassword
    await user.save({validateBeforeSave:false})
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {

            },
            "Password Changed SuccessFully"
        )
    )
    }else{
        return res
    .status(401)
    .json(
        new ApiResponse(
            401,
            {},`OTP verification Failed: Reason-> ${result.message}`
        )
    )
    }
    
    
})

const userDetails = asyncHandler(async(req,res)=>{
    const userRole = roleModelMap[req.user?.role]
    // console.log(req.user?._id)
    let result;
    try {
        result = await userRole.findById(req.user?._id).select("-password -refreshToken -faceEmbedding")
    } catch (error) {
        throw new ApiError(500,error,"<<-----Something went wrong")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Data fetched succesfully.")
    )
});

const updateFaceData = asyncHandler(async(req,res)=>{
    const cameraImageLocalPath = req.file?.path
    const userRole = roleModelMap[req.user?.role]
    const faceEmbedding = await generateFaceEncoding(cameraImageLocalPath)
    if(!faceEmbedding){
        throw new ApiError(500,"Face embeddings generation failed")
    }
    const user = await userRole.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                faceEmbedding: faceEmbedding
            }
        },
        {new:true}
    ).select("-password -refreshToken")
    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Face data updated succesfully.")
    )
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token, role } = req.query;
    
    // Select model based on role
    let Model;
    switch(role.toLowerCase()) {
      case 'faculty':
        Model = Faculty;
        break;
      case 'student':
        Model = Student;
        break;
      default:
        throw new ApiError(400, "Invalid role specified");
    }
  
    const user = await Model.findOne({
      emailVerificationToken: token,
      emailVerificationExpiry: { $gt: Date.now() }
    });
  
    if (!user) {
      throw new ApiError(400, "Invalid or expired verification token");
    }
  
    // Update user verification status
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();
  
    return res.status(200).json(
      new ApiResponse(200, {}, "Email verified successfully")
    );
  });
export {
    loginRequestOtp,
    loginVerifyOtp,
    faceRecognitionLogin,
    changeCurrentPassword,
    logout,
    requestForgotPassword,
    resetPassword,
    userDetails,
    updateFaceData,
    checkAuth,
    verifyEmail
};
