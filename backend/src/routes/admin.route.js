import {Router} from "express";
import {
    createAdmin
} from "../controllers/admin.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyAdmin} from "../middlewares/verifyAdmin.middleware.js"
const router = Router()

router.route(verifyJWT,verifyAdmin)

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
    ,createAdmin)

export default router