import nodemailer from "nodemailer"
import crypto from "crypto";
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
// import Admin from "../models/admin.model.js";
// import Faculty from "../models/admin.faculty.js";
// import HOD from "../models/admin.hod.js";
// import Student from "../models/admin.student.js";






//email transporter setup

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"juciepiladomausambika@gmail.com",
        pass:"lxtc peuz kjvk vcoj"
    },
});

let otpStore = {};

// Generate OTP

const generateOtp = async function (email){
  /*
  accept the email from the body
  check if the email is empty or not
  generate a six digit otp
  generate a expiry time-5min
  store otp and expiry locally not in database
  send the otp to the user
  send a succefull message as a response
  */

  if(!email){
    throw new ApiError(400,"Email is required")
  }
  const otp = crypto.randomInt(100000, 999999).toString();

 
  const expiry = Date.now() + 5 * 60 * 1000;

  otpStore[email]={otp,expiry}

  //sending the otp to the mail
  await transporter.sendMail({
    from:"OTP provide",
    to: email,
    subject:"Your OTP code",
    text:`Your otp is ${otp}. I will expire in 5 min`
  });
  return true

}

const verifyOtp = async function(email,otp){
  
  if(!email || !otp){
    throw new ApiError(400, "Email is required")
  }
  const otpData = otpStore[email]
  if(!otpData){
    throw new ApiError(400,"No otp data found for this email. Try again")
  }
  if(otpData.otp !== otp){
    throw new ApiError(400,"Invalid OTP")
  }
  if(Date.now() > otpData.expiry){
    throw new ApiError(400,"OTP has expired")
  }
  delete otpStore[email];
  return true

}

export{
  generateOtp,
  verifyOtp
}
