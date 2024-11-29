import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js"
import { Admin } from "./models/admin.models.js";
// const app = express()
dotenv.config({
    path:'./env'
})

const createDefaultAdmin = async ()=>{
    const fullName = "akash"
    const email = "akashyadav15032002@gmail.com"
    try {
        const existingAdmin = await Admin.findOne({email});
        if (!existingAdmin) {
        //   const hashedPassword = await bcrypt.hash("admin123", 10); // Securely hash the default password
    
          await Admin.create({
            fullName,
            email,
            phoneNumber:"9113702866",
            password:"admin123",
            role:"admin",
            avatar:"N/A",
            cameraImage:"N/A",
          });
    
          console.log(`Default admin created: ${email} / admin123`);
        } else {
          console.log("Default admin already exists.");
        }
      } catch (error) {
        console.error("Error creating default admin:", error);
      }
}

connectDB().then(async ()=>{
    await createDefaultAdmin()
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at Port: ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("mongoDB connection Failed->", err)
})
