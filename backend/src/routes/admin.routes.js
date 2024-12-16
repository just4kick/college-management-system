import {Router} from "express";
import {
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
updateDetails
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
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyAdmin} from "../middlewares/verifyAdmin.middleware.js"
import {hodExists} from "../middlewares/oneHod.middleware.js"
import {addImages,
    removeImage,} from "../controllers/gallery.controller.js"
const router = Router()



router.route("/login-request").post(loginRequestOtp)
router.route("/face-login").post(upload.single("cameraImage"),faceRecognitionLogin)
router.route("/request-forgot-pass").post(requestForgotPassword),
router.route("/reset-password").patch(resetPassword)

router.use(verifyJWT,verifyAdmin)

router.route("/create-Admin").post(
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
    ,verifyJWT,createAdmin)

router.route("/create-dept").post(createDepartment)
router.route("/view-dept").get(viewAllDepartments)
router.route("/update-course").patch(addCourse)
router.route("/delete-dept").delete(deleteDepartment)
router.route("/assign-hod").patch(hodExists,assignHOD)
router.route("/revoke-hod").patch(revokeHOD)
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
    registerFaculty)
router.route("/delete-faculty").delete(deleteFaculty)
router.route("/search-faculty").get(searchFaculty)
router.route("/view-faculty-deptWise").get(viewAllFacultyDeptWise)
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
    ]),registerStudent)
router.route("/delete-student").delete(deleteStudent)
router.route("/search-student").get(searchStudent)
router.route("/view-student-deptWise").get(viewAllStudentDeptWise)
router.route("/generate-keys").post(generateRegistrationKey)
router.route("/view-keys").get(viewRegistrationKey)
router.route("/revoke-keys").patch(revokeRegistrationKey)
router.route("/grant-keys").patch(grantRegistrationKey)
router.route("/add-keys").patch(addRegistrationKey)
router.route("/remove-keys").patch(removeRegistrationKey)
router.route("/add-notice").post(addNoticeByAdmin)
router.route("/remove-notice").delete(removeNoticeByAdmin)
router.route("/view-notice").get(viewAllNotice)
router.route("/update-details").patch(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
    ]),
    updateDetails
);
// common controller routes

router.route("/logout").post(logout)
router.route("/login-verify").post(loginVerifyOtp)
router.route("/change-password").post(changeCurrentPassword)

router.route("/user-detail").get(userDetails)
router.route("/update-face").patch(upload.single("cameraImage"),updateFaceData)
router.route("/add-images").post(upload.array("images"),addImages)
router.route("/remove-image/:id").delete(removeImage)
export default router