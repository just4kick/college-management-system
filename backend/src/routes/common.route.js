import {Router} from "express";
import{
    loginRequestOtp,
    loginVerifyOtp,
    faceRecognitionLogin,
    changeCurrentPassword,
    logout,
    requestForgotPassword,
} from "../controllers/common.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()


router.route("/login-request").post(loginRequestOtp)
router.route("/login-verify").post(verifyJWT,loginVerifyOtp)
router.route("/face-login").post(upload.single("cameraImage"),faceRecognitionLogin)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
export default router