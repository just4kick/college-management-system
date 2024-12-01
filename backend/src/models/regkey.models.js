import mongoose, { Schema } from "mongoose";

const keySchema  = new mongoose.Schema({
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
    },
    facultyKeys:
    [{
        key:
        {
            type:String,
            required:true,
        },
        isActive:
        {
            type:Boolean,
            default:true,
        }
    }],
    studentKeys:
    [{
        key:
        {
            type:String,
            required:true,
        },
        isActive:
        {
            type:Boolean,
            default:true,
        }
    }],
},{timestamps:true});
export const Key = mongoose.model("Key",keySchema);

