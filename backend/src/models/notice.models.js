import mongoose, { Schema } from "mongoose";

const noticeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:"createdByModel",
        required:true,
    },
    createdByModel:{
        type:String,
        required:true,
        enum:['Admin','Faculty']
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        default:null,
    },
    isGlobal:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

export const Notice = mongoose.model("Notice",noticeSchema);
