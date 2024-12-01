import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import{generateFaceEncoding} from "../services/faceRecognition.service.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Student } from "../models/student.models.js";
import { Faculty } from "../models/faculty.models.js";
import { Key } from "../models/regkey.models.js";


const viewDeptStudents = asyncHandler(async (req, res) => {
    const {page=1,limit=10}=req.body
    // TODO: Implement viewDeptStudents
    // show student details course and year wise
    // Department fetch will be done: As faculty must be logged id, using that
    // fetch the department id, using id fetch name and show the students department and course wise
    const userID = req.user?._id
    const deptID = userID.department

    try {
        const students= await Student.aggregate([
            {
                $match:{department:mongoose.Schema.Types.ObjectId(deptID)}
            },
            {
                $group:{
                    _id:{course:"$course", year:"$year"},
                    students:{$push:{name:"$fullName",email:"$email",phone:"$phoneNumber"}},
                    totalStudents:{$sum:1}
                }
            },
            {$sort:{"_id.course":1,"_id.year":1}},
            {$skip:(page-1)*limit},
            {$limit:limit} 
        ]);
    } catch (error) {
        throw new ApiError(500,error,"Something Went Wrong <<---")
    }

    return res
            .status(200,students,"Data fetched succesfully.")
    
});

const updateFacultyDetails = asyncHandler(async (req, res) => {
    // TODO: Implement viewDeptStudents
    const faculty = Faculty.findById(req.user?._id)

    if(!faculty){
        throw new ApiError(500, "Data not found")
    }
    const avatarLocalPath = req.file?.path
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(avatar){
        Faculty.avatar = avatar?.url
    }
    Object.keys(req.body).forEach((key)=>{
        if(req.body[key]!==undefined && key !== 'avatar'){
            faculty[key]=req.body[key]
        }
    })
    await faculty.save()

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully."));
});

const selfRegisterFaculty = asyncHandler(async (req, res) => {
    // TODO: Implement viewDeptStudents
    const {fullName,email,phoneNumber,password,deptId} = req.body
    if(
        [fullName,email,phoneNumber,password,deptId].some((field)=> field?.trim()==="")
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

    // checking the faculty key is registered or not,if not he cant be able to register himself
    const isActiveFacultyKey = await Key.findOne({
        departmentId: deptId,
        "facultyKeys.key": phoneNumber,
        "facultyKeys.isActive": true,
      });
      
      const matchingKey = isActiveFacultyKey?.facultyKeys.find(
        (keyObj) => keyObj.key === phoneNumber && keyObj.isActive === true
      );

      if(!matchingKey.isActive){
        throw new ApiError(402,"You are not authorized to register Yourself. ")
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





export {
    viewDeptStudents,
    updateFacultyDetails,
    selfRegisterFaculty
};
