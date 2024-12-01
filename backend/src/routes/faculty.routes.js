import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyHOD} from "../middlewares/verifyHOD.middleware.js"
import {viewDeptStudents,
    updateFacultyDetails,
    selfRegisterFaculty
} from "../controllers/faculty.controller.js"
import {
    registerStudent,
    deleteStudent,
    searchStudent,
    registerFaculty,
    deleteFaculty,
    searchFaculty,
    viewAllNotice
} from "../controllers/admin.controller.js"

import {
    loginRequestOtp,
    loginVerifyOtp,
    faceRecognitionLogin,
    changeCurrentPassword,
    logout,
    requestForgotPassword,
    resetPassword,
    userDetails,
    updateFaceData
} from "../controllers/common.controller.js"
import { addNoticeByHOD, removeNoticeByHOD } from "../controllers/hod.controller.js";

const router = Router()

router.route("/login-request").post(loginRequestOtp)
router.route("/face-login").post(upload.single("cameraImage"),faceRecognitionLogin)
router.route("/request-forgot-pass").post(requestForgotPassword),
router.route("/self-register-faculty").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"cameraImage",
            maxCount:1
        }
    ]),
    selfRegisterFaculty)

router.use(verifyJWT)
//each faculty can perform
router.route("/view-students").get(viewDeptStudents)
router.route("/updateFacultyDetails").patch(updateFacultyDetails)
router.route("/register-student").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"cameraImage",
            maxCount:1
        }
    ]),
    registerStudent)
router.route("/delete-student").delete(deleteStudent)
router.route("/search-student").get(searchStudent)

// common controller routes
router.route("/logout").post(logout)
router.route("/login-verify").post(loginVerifyOtp)
router.route("/change-password").post(changeCurrentPassword)
router.route("/reset-password").patch(resetPassword)
router.route("/user-detail").get(userDetails)
router.route("/update-face").patch(upload.single("cameraImage"),updateFaceData)
//hod exculsive task 
router.route("/register-faculty").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"cameraImage",
            maxCount:1
        }
    ]),
    verifyHOD,registerFaculty)
router.route("/delete-faculty").delete(verifyHOD,deleteFaculty)
router.route("/search-faculty").get(verifyHOD,searchFaculty)
router.route("/add-notice-hod").post(verifyHOD,addNoticeByHOD)
router.route("/remove-notice-hod").delete(verifyHOD,removeNoticeByHOD)
router.route("/view-notice-hod").get(verifyHOD,viewAllNotice)

export default router