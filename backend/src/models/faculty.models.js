import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const facultySchema = new mongoose.Schema({
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
  },
    password: {
      type: String,
      required: true,
    },
    role:{
    type: String,
    default:"faculty"
  },
  isHOD: { type: Boolean, default: false },
  isFaceRegistered: { type: Boolean, default: false },
  faceEmbedding: { type: Array, default: null },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    refreshToken:{
      type:String,
     },
     isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpiry: Date
  },{timestamps:true});
  
  facultySchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password,10)
        next()
  })
  
  facultySchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
  }
  
  facultySchema.methods.generateAccessToken=function(){
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
  
  facultySchema.methods.generateRefreshToken=function(){
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


  export const Faculty = mongoose.model("Faculty", facultySchema);
  