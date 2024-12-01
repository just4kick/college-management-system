import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {
    selfRegisterStudent,
    updatePersonalDetails
} from "../controllers/student.controller.js"
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
const router = Router()
router.route("/self-register-student").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"cameraImage",
            maxCount:1
        }
    ])
    ,selfRegisterStudent)

router.route("/update-detail").patch(upload.single("avatar"),verifyJWT,updatePersonalDetails)

// common controller routes

router.route("/login-request").post(loginRequestOtp)
router.route("/login-verify").post(verifyJWT,loginVerifyOtp)
router.route("/face-login").post(upload.single("cameraImage"),faceRecognitionLogin)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/logout").post(logout)
router.route("/request-forgot-pass").post(requestForgotPassword),
router.route("/reset-password").patch(verifyJWT,resetPassword)
router.route("/user-detail").get(verifyJWT,userDetails)
router.route("/update-face").patch(upload.single("cameraImage"),verifyJWT,updateFaceData)