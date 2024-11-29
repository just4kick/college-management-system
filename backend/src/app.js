import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
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
import adminRouter from "./routes/admin.route.js"
import commonRouter from "./routes/common.route.js"


//routes Declaration
app.use("/api/v1/admins",adminRouter)
app.use("/api/v1/common",commonRouter)



export {app}