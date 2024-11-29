import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Admin} from "../models/admin.models.js"
import { Department } from "../models/dept.models.js";
import {Faculty} from "../models/faculty.modles.js"
import {Student} from "../models/student.models.js"
import {Key} from "../models/regkey.models.js"
import{generateFaceEncoding,
    verifyFaceEncoding,
    verifyAndRespond,} from "../services/faceRecognition.service.js"
import fs from "fs"
import axios from "axios"
import FormData from 'form-data';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Student } from "../models/student.models.js";

const generateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await Admin.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating token-Hamari galti hai")
    }
}

const createAdmin = asyncHandler(async (req, res) => {
    // TODO: Implement createAdmin

    /*
    get admin details and check if any of the detail is missing or invalid
    check if same admin is registerd or not using email or phoneNumber
    check images like avatar 
    upload it in cloudinary and store the url to database
    check the role
    create user object
    remove password and refresh token filed from response
    check that the admin is created or not
    return response


    */
    const { fullName,email,phoneNumber,password,role }=req.body;
    if(
        [fullName,email,phoneNumber,password,role].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }

    function isValidEmail(email){
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if(!isValidEmail(email)){
        throw new ApiError(400,"Not a vaild Email!")
    }

    function isValidPhone(phoneNumber) {
        return phoneNumber.length === 10;
    }
    

    if(!isValidPhone(phoneNumber)){
        throw new ApiError(401,"Phone Number must be of 10 digits.")
    }
    if (role !== "admin") {
        throw new ApiError(400, "You are adding Admin. Mention it");
    }
    

    const existedUser = await Admin.findOne({
        $or:[{phoneNumber},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"Username or Username is already Existed")
    }
    
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const cameraLocalPath = req.files?.cameraImage[0]?.path

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar is not availavle")
    }

    const pythonApiUrl = "http://127.0.0.1:5000/api/generate-encoding"; 
    const imagePath = cameraLocalPath;

    let faceEncoding;
    try {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));

        const response = await axios.post(pythonApiUrl, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        faceEncoding = response.data.faceEncoding;
    } catch (error) {
        throw new ApiError(500, `Face encoding failed: ${error.response?.data?.error || error.message}`);
    }

    if (!faceEncoding) {
        throw new ApiError(500, "Face encoding is missing from the API response");
    }
    
    const admin = await Admin.create({
        fullName,
        email,
        phoneNumber,
        role,
        avatar:avatar.url,
        password,
        faceEmbedding:faceEncoding,
        isFaceRegistered:true,
    })

    const isCreatedAdmin = await Admin.findById(admin._id).select("-password -refreshToken")
    if(!isCreatedAdmin){
        throw new ApiError(500,"DevError:Something went wrong")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,isCreatedAdmin,"Admin created")
        )

});

const createDepartment = asyncHandler(async (req, res) => {
    // TODO: Implement createDepartment
    const {name,courses,deptId} = req.body
    if(!name && !courses && deptId){
        throw new ApiError(400,"Name and courses are mandatory.")

    }
    const createdDept = await Department.create({
        name,
        deptId,
        courses,
    })

    if(!createdDept){
        throw new ApiError(500,"Something went wrong while creating department.")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,createdDept,"Department creation succesfull")
            )
});

const viewAllDepartments = asyncHandler(async (req, res) => {
    // TODO: Implement viewAllDepartments
    const result = await Department.find({})
    if(!result){
        throw new ApiError(500,"Something went wrong While fecthing dept details")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,result,"Fetched successfully")
            )
});

const updateCoursesDetails = asyncHandler(async (req, res) => {
    /*

    take depatment name or deptId from the user,

    */
    const {course,deptId} = req.body
    if(!course && !deptId){
        throw new ApiError(500,"Provide both fields")
    }
    const dept = await Department.findOne({deptId})
    if(!dept){
        throw new ApiError(500,"Given department is not Valid")
        
    }
    dept.courses.append("course")
    await dept.save({validateBeforeSave:false})
    return res
            .status(200)
            .json(
                new ApiResponse(200,dept,"changes made successfully")
            )
});

const deleteDepartment = asyncHandler(async (req, res) => {
    // TODO: Implement deleteDepartment
    const {deptName} = req.body
    if(!deptName){
        throw new ApiError(400,"Dept name is required")
    }

    try {
        await Department.deleteOne({name:deptName})     
    } catch (error) {
        throw new ApiError(400,error,"Something went Wrong")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,{},"Department Deleted Successfully.")
            )
});

const assignHOD = asyncHandler(async (req, res) => {
    // TODO: Implement assignHOD
    const {HODemail,deptId} = req.body
    if(!HODemail && !deptId){
        throw new ApiError(400,"Faculty name and deptId is required")
    }
    const hod = await Faculty.findOneAndUpdate(
        {email:HODemail},
        {
            $set:
                {
                    isHOD:true,
                }
        }
    )
    if(!hod){
        throw new ApiError(400,"Faculty Fetching failed")
    }
    const result = await Department.findOneAndUpdate(
        {deptId},
        {
            $set:
                {
                    HOD:hod?._id,
                }
        }
    )
    if(!result){
        throw new ApiError(400,"HOD assinging Failed")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{result},"HOD assigned completed.")
            )
});

const revokeHOD = asyncHandler(async(req,res)=>{
    const {HODemail,deptId} = req.body
    if(!HODemail && !deptId){
        throw new ApiError(400,"Faculty name and deptId is required")
    }
    const hod = await Faculty.findOneAndUpdate(
        {email:HODemail},
        {
            $set:
                {
                    isHOD:false,
                }
        }
    )
    if(!hod){
        throw new ApiError(400,"Faculty Fetching failed")
    }
    const result = await Department.findOneAndUpdate(
        {deptId},
        {
            $set:
                {
                    HOD:null,
                }
        }
    )
    if(!result){
        throw new ApiError(400,"HOD Revoke Failed")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{result},"HOD Revoke completed.")
            )
});

const registerFaculty = asyncHandler(async (req, res) => {
    // TODO: Implement registerFaculty
    const {fullName,email,phoneNumber,password,deptId} = req.body
    if(
        [fullName,email,phoneNumber,password,deptId].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const dept = await Department.findOne({deptId})

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
        department:dept?._id,
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
        await Faculty.deleteOne({email})
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
    const {email} = req.body
    if(!email){
        throw new ApiError(400,"Email is required")
    }

    const faculty = await Faculty.findOne({email})
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
})
const viewAllFacultyDeptWise = asyncHandler(async (req, res) => {
    // TODO: Implement registerStudent
    try {
        const facultiesByDept = await Faculty.aggregate([
            {
                $lookup:{
                    from:"departments",
                    localField:"department",
                    foreignField:"_id",
                    as:"departmentDetails"
                }
            },
            {$unwind:"departmentDetails"},
            {
                $group:{
                    _id:"$departmentDetails.name",
                    faculties:{$push:"$fullName"}
                }
            },
            {$sort:{_id:1}}
        ])

        if(!facultiesByDept){
            throw new ApiError(500,"Something went Wrong During Fetching Data")
        }

        return res
                .status(200)
                .json(
                    new ApiResponse(200,facultiesByDept,"Data Fetched Completed")
                )
    } catch (error) {
        throw new ApiError(400,error,"Something went Wrong During Fetching Data")
    }
});


const registerStudent = asyncHandler(async (req, res) => {
    // TODO: Implement registerStudent

    const {fullName,email,phoneNumber,password,course,year,session,deptId} = req.body
    if(
        [fullName,email,phoneNumber,password,course,year,session,deptId].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const dept = await Department.findOne({deptId})

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
        course,
        year,
        session,
        department:dept?._id
    })

    if(!faculty){
        throw new ApiError(500,"Student registration failed")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,faculty,"Student registraion completed.")
            )
});

const deleteStudent = asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    try {
        await Student.deleteOne({email})
    } catch (error) {
        throw new ApiError(500,error,"Something went wrong")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,{},"Deletion Successfully.")
            )
});

const searchStudent = asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new ApiError(400,"Email is required")
    }

    const student = await Student.findOne({email})
    .select("-password -faceEmbedding -refreshToken")
    .populate("department","name")

    if(!student){
        throw new ApiError(500,"User is not Available")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,student,"Search Completed with result")
            )
})

const viewAllStudentDeptWise = asyncHandler(async (req, res) => {
    // TODO: Implement registerStudent
    try {
        const StudentByDept = await Student.aggregate([
            {
                $lookup:{
                    from:"departments",
                    localField:"department",
                    foreignField:"_id",
                    as:"departmentDetails"
                }
            },
            {$unwind:"departmentDetails"},
            {
                $group:{
                    _id:"$departmentDetails.name",
                    faculties:{$push:"$fullName"}
                }
            },
            {$sort:{_id:1}}
        ])

        if(!StudentByDept){
            throw new ApiError(500,"Something went Wrong During Fetching Data")
        }

        return res
                .status(200)
                .json(
                    new ApiResponse(200,StudentByDept,"Data Fetched Completed")
                )
    } catch (error) {
        throw new ApiError(400,error,"Something went Wrong During Fetching Data")
    }
});

const generateRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement generateRegistrationKey
});

const viewRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement viewRegistrationKey
});

const revokeRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement revokeRegistrationKey
});

const modifyRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement modifyRegistrationKey
});

const addNotice = asyncHandler(async (req,res)=>{
    //TODO: Implement notice bt HOD
})

export {
    createAdmin,
    assignHOD,
    registerFaculty,
    registerStudent,
    viewAllUsers,
    viewDepartmentDetails,
    generateRegistrationKey,
    viewRegistrationKey,
    revokeRegistrationKey,
    modifyRegistrationKey,
    createDepartment,
    viewAllDepartments,
    updateCoursesDetails,
    deleteDepartment,
    revokeHOD,
    viewAllFacultyDeptWise
};
