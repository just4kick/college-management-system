import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    avatar:{
    type:String,
    required:true,
  },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    role:{
    type: String,
    default:"student"
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    course: { type: String, required: true }, 
    year: { type: Number, required: true },
    session: String,
    isFaceRegistered: {
      type: Boolean,
      default: false,
    },
    faceEmbedding: {
      type: Array,
      default: null,
    },
    refreshToken:{
      type:String,
     }
  },{timestamps:true});
  


  studentSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password,10)
        next()
  })
  
  studentSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
  }
  
  studentSchema.methods.generateAccessToken=function(){
    return jwt.sign(
    {
       _id:this._id,
       email:this.email,
       fullName: this.fullName,
       role:this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
  )
  }
  studentSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
           _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
  }

  export const Student = mongoose.model("Student", studentSchema);
  