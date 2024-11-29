import mongoose, { Schema } from "mongoose";

const keySchema  = new mongoose.Schema({
    departmentName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
    },
    facultyKeys:
    [{
        key:
        {
            tpye:String,
            required:true,
        },
        isActive:
        {
            type:Boolean,
            default:true,
        }
    }],
    StudentKeys:
    [{
        key:
        {
            tpye:String,
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

