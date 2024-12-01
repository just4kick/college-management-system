import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Key } from "../models/regkey.models.js";
import { generateFaceEncoding } from "../services/faceRecognition.service.js";
import { Student } from "../models/student.models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const updatePersonalDetails = asyncHandler(async (req, res) => {
    // TODO: Implement updatePersonalDetails
    const student = Student.findById(req.user?._id)

    if(!student){
        throw new ApiError(500, "Data not found")
    }
    const avatarLocalPath = req.file?.path
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(avatar){
        student.avatar = avatar?.url
    }
    Object.keys(req.body).forEach((key)=>{
        if(req.body[key]!==undefined && key !== 'avatar'){
            student[key]=req.body[key]
        }
    })
    await student.save()

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully."));
});

const selfRegisterStudent = asyncHandler(async (req, res) => {
    // TODO: Implement viewDeptStudents
    const {fullName,email,phoneNumber,password,course,year,session,deptId} = req.body
    if(
        [fullName,email,phoneNumber,password,course,year,session,deptId].some((field)=> field?.trim()==="")
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
    const dept = await Department.findOne({deptId})

    const isActiveStudentKey = await Key.findOne({
        departmentId: deptId,
        "studentKeys.key": phoneNumber,
        "studentKeys.isActive": true,
      });
      
      const matchingKey = isActiveStudentKey?.studentKeys.find(
        (keyObj) => keyObj.key === phoneNumber && keyObj.isActive === true
      );

      if(!matchingKey.isActive){
        throw new ApiError(402,"You are not authorized to register Yourself. ")
      }
    const avatarLocalPath = req.files?.avatar[0].path
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const cameraImageLocalPath = req.files?.cameraImage[0].path
    const faceEmbedding = await generateFaceEncoding(cameraImageLocalPath)

    const student = await Student.create({
        fullName,
        email,
        phoneNumber,
        avatar:avatar.url,
        password,
        faceEmbedding,
        isFaceRegistered:true,
        course,
        year,
        session,
        department:dept?._id
    })

    if(!student){
        throw new ApiError(500,"Student registration failed")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,student,"Student registraion completed.")
            )
});

export {
    selfRegisterStudent,
    updatePersonalDetails
};
