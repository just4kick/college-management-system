import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { checkAuth,verifyEmail } from './controllers/common.controller.js'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import adminRouter from "./routes/admin.routes.js"
import facultyRouter from "./routes/faculty.routes.js"
import studentRouter from "./routes/student.routes.js"
import galleryRouter from "./routes/gallery.routes.js"

//routes Declaration
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/faculty",facultyRouter)
app.use("/api/v1/student",studentRouter)
app.use("/api/v1/gallery",galleryRouter)

app.get("/api/v1/check-auth",checkAuth)
app.get("/verify-email", verifyEmail)


export {app}