import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  deptId:{type: String, required:true, unique:true},
  courses: [{ type: String, required: true }],
  HOD: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  },{timestamps:true});
  
export const Department = mongoose.model("Department", departmentSchema);
