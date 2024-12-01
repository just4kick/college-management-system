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
} from "../controllers/admin.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyAdmin} from "../middlewares/verifyAdmin.middleware.js"
const router = Router()


router.route("/login-request").post(loginRequestOtp)
router.route("/face-login").post(upload.single("cameraImage"),faceRecognitionLogin)
router.route("/request-forgot-pass").post(requestForgotPassword),


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
router.route("/assign-hod").patch(assignHOD)
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
router.route("/remove-keys").patch(removeRegistrationKey)
router.route("/add-notice").post(addNoticeByAdmin)
router.route("/remove-notice").delete(removeNoticeByAdmin)
router.route("/view-notice").get(viewAllNotice)

// common controller routes

router.route("/logout").post(logout)
router.route("/login-verify").post(loginVerifyOtp)
router.route("/change-password").post(changeCurrentPassword)
router.route("/reset-password").patch(resetPassword)
router.route("/user-detail").get(userDetails)
router.route("/update-face").patch(upload.single("cameraImage"),updateFaceData)

export default router