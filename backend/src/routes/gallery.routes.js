import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {verifyAdmin} from "../middlewares/verifyAdmin.middleware.js"
import { addImages,
    removeImage,
    viewGlobalImage,
    viewDeptImage, } from "../controllers/gallery.controller.js";
const router = Router()

router.get('/global-images',viewGlobalImage)
router.get('/dept-images',viewDeptImage)
router.post('/add-images',upload.array('images'),verifyJWT,verifyAdmin,addImages)
router.delete('/remove-images',verifyJWT,verifyAdmin,removeImage)
export default router