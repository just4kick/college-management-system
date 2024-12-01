//utils
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
//modles
import {Admin} from "../models/admin.models.js"
import { Department } from "../models/dept.models.js";
import {Faculty} from "../models/faculty.modles.js"
import {Student} from "../models/student.models.js"
import {Key} from "../models/regkey.models.js"
import {Notice} from "../models/notice.models.js"
//face-recognition
import{generateFaceEncoding} from "../services/faceRecognition.service.js"
//misc.
import fs from "fs"
import axios from "axios"
import FormData from 'form-data';



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

const addCourse = asyncHandler(async (req, res) => {
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

// can be called by HOD as well
const registerFaculty = asyncHandler(async (req, res) => {
    // TODO: Implement registerFaculty
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
});
//ends here
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
//can be called by hod and faculty as well
const registerStudent = asyncHandler(async (req, res) => {
    // TODO: Implement registerStudent

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
//ends here
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
                    studentt:{$push:"$fullName"}
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
    const { deptId,facultyKeys, studentKeys } = req.body;


if (!facultyKeys?.length && !studentKeys?.length) {
    throw new ApiError(400, "Keys are empty");
}

function isValidPhone(phoneNumber) {
    return phoneNumber.length === 10;
}

if (facultyKeys && Array.isArray(facultyKeys)) {
    for (let i = 0; i < facultyKeys.length; i++) {
        if (!isValidPhone(facultyKeys[i].key)) {
            throw new ApiError(401, `Phone Number at index ${i} in facultyKeys must be of 10 digits.`);
        }
    }
} else if (facultyKeys) {
    throw new ApiError(400, "facultyKeys must be an array.");
}

if (studentKeys && Array.isArray(studentKeys)) {
    for (let i = 0; i < studentKeys.length; i++) {
        if (!isValidPhone(studentKeys[i].key)) {
            throw new ApiError(401, `Phone Number at index ${i} in studentKeys must be of 10 digits.`);
        }
    }
} else if (studentKeys) {
    throw new ApiError(400, "studentKeys must be an array.");
}

const dept = await Department.findOne({deptId})
if (!dept?._id) {
    throw new ApiError(400, "Invalid department ID");
}
const keys = await Key.create({
    departmentId: dept?._id,
    facultyKeys:facultyKeys,
    studentKeys:studentKeys,
})

if(!keys){
    throw new ApiError(400,"Something went wrong, creation Failed")
}

return res
        .status(200)
        .json(
            new ApiResponse(200,"Keys generatin succesfull")
        )
});

const viewRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement viewRegistrationKey
    const {deptId} = req.body

    const dept = await Department.findOne({deptId})
    if(!dept){
        throw new ApiError(500,"DeptId is invalid")
    }
    const result = await Key.findOne({departmentId:dept?._id})
    if(!result){
        throw new ApiError(500,"Result not found")
    }
    return res
            .status(200)
            .json(
                new ApiResponse(200,"Fetching succesfull")
            )
});

const revokeRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement revokeRegistrationKey
    const {deptId,searchKey,role} = req.body
    const dept = await Department.findOne({deptId})
    if(!dept){
        throw new ApiError(500,"DeptId is invalid")
    }
    if(searchKey && Array.isArray(searchKey)){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "facultyKeys.key": searchKey }, 
                {
                    $set: { "facultyKeys.$[elem].isActive": false },
                },
                {
                    arrayFilters: [{ "elem.key":  { $in: searchKey } }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key revoked successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "studentKeys.key": searchKey },
                {
                    $set: { "studentKeys.$[elem].isActive": false }, 
                },
                {
                    arrayFilters: [{ "elem.key":  { $in: searchKey } }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key revoked successfully",
                data: updatedDocument,
            });
        }
    }else if(searchKey){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "facultyKeys.key": searchKey }, 
                {
                    $set: { "facultyKeys.$[elem].isActive": false },
                },
                {
                    arrayFilters: [{ "elem.key": searchKey }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key revoked successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "studentKeys.key": searchKey },
                {
                    $set: { "studentKeys.$[elem].isActive": false }, 
                },
                {
                    arrayFilters: [{ "elem.key": searchKey }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key revoked successfully",
                data: updatedDocument,
            });
        }
    }else{
        throw new ApiError(500,"Search Key not found")
    }

});

const grantRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement revokeRegistrationKey
    const {deptId,searchKey,role} = req.body
    const dept = await Department.findOne({deptId})
    if(!dept){
        throw new ApiError(500,"DeptId is invalid")
    }
    if(searchKey && Array.isArray(searchKey)){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "facultyKeys.key": searchKey }, 
                {
                    $set: { "facultyKeys.$[elem].isActive": true },
                },
                {
                    arrayFilters: [{ "elem.key":  { $in: searchKey } }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key Grant successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "studentKeys.key": searchKey },
                {
                    $set: { "studentKeys.$[elem].isActive": true }, 
                },
                {
                    arrayFilters: [{ "elem.key":  { $in: searchKey } }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key Grant successfully",
                data: updatedDocument,
            });
        }
    }else if(searchKey){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "facultyKeys.key": searchKey }, 
                {
                    $set: { "facultyKeys.$[elem].isActive": true },
                },
                {
                    arrayFilters: [{ "elem.key": searchKey }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key Grant successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id, "studentKeys.key": searchKey },
                {
                    $set: { "studentKeys.$[elem].isActive": true }, 
                },
                {
                    arrayFilters: [{ "elem.key": searchKey }], 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key Grant successfully",
                data: updatedDocument,
            });
        }
    }else{
        throw new ApiError(500,"Search Key not found")
    }
});

const addRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement modifyRegistrationKey
    const { deptId, keysToadd, role } = req.body;
    const dept = await Department.findOne({deptId})
    if(!dept){
        throw new ApiError(500,"DeptId is invalid")
    }


    if(keysToadd && Array.isArray(keysToadd)){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $push: { facultyKeys: { key: { $in: keysToadd } } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key Deleted successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $push: { StudentKeys: { key: { $in: keysToadd } } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key Deleted successfully",
                data: updatedDocument,
            });
        }
    }else if(keysToadd){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $push: { facultyKeys: { key:keysToadd } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key Deleted successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $push: { StudentKeys: { key: { $in: keysToadd } } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key Deleted successfully",
                data: updatedDocument,
            });
        }
    }else{
        throw new ApiError(500,"Search Key not found")
    }
});

const removeRegistrationKey = asyncHandler(async (req, res) => {
    // TODO: Implement modifyRegistrationKey
    const {deptId,searchKey,role} = req.body
    const dept = await Department.findOne({deptId})
    if(!dept){
        throw new ApiError(500,"DeptId is invalid")
    }


    if(searchKey && Array.isArray(searchKey)){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $pull: { facultyKeys: { key: { $in: searchKey } } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key Deleted successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $pull: { StudentKeys: { key: { $in: searchKey } } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key Deleted successfully",
                data: updatedDocument,
            });
        }
    }else if(searchKey){
        if(role==="faculty"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $pull: { facultyKeys: { key:searchKey } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            return res.status(200).json({
                message: "Faculty key Deleted successfully",
                data: updatedDocument,
            });
        }else if(role==="student"){
            const updatedDocument = await Key.findOneAndUpdate(
                { departmentId: dept?._id}, 
                {
                    $pull: { StudentKeys: { key: { $in: searchKey } } },
                },
                { 
                    new: true,
                }
            );
            
            if (!updatedDocument) {
                throw new ApiError(404, "Key not found or department does not exist");
            }
            
            return res.status(200).json({
                message: "Student key Deleted successfully",
                data: updatedDocument,
            });
        }
    }else{
        throw new ApiError(500,"Search Key not found")
    }
});

const addNoticeByAdmin = asyncHandler(async (req,res)=>{
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
        createdByModel:'Admin',
        department:null,
        isGlobal:true,
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

const removeNoticeByAdmin = asyncHandler(async (req,res)=>{
    //TODO: remove notice by admin
    const removeNotice = asyncHandler(async (req, res) => {
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
    

});

const viewAllNotice = asyncHandler(async (req,res)=>{
    //TODO: Implement notice 

    // const globalNotices = await Notice.find({ isGlobal: true }).populate('createdBy _id name');
    try {
        const allNotices = await Notice.find({
            $or: [{ isGlobal: true },  {department: { $exists: true }}]
        }).populate('createdBy _id name').populate('department _id name');  
    } catch (error) {
        throw new ApiError(500,error,"Something went wrong.")
    }
    return res.status(200).json(
        new ApiResponse(200,allNotices,"Notice fetched succesfull")
    )
});

export {
createAdmin,
createDepartment,
viewAllDepartments,
addCourse,
deleteDepartment,
assignHOD,
revokeHOD,
registerFaculty,
deleteFaculty,
searchFaculty,
viewAllFacultyDeptWise,
registerStudent,
deleteStudent,
searchStudent,
viewAllStudentDeptWise,
generateRegistrationKey,
viewRegistrationKey,
revokeRegistrationKey,
grantRegistrationKey,
addRegistrationKey,
removeRegistrationKey,
addNoticeByAdmin,
removeNoticeByAdmin,
viewAllNotice,
};
