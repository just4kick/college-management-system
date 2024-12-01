import mongoose, { Schema } from "mongoose";

const noticeSchema = new mongoose.Schema({
    title:{
        tpye:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.objectId,
        refPath:"createdByModel",
        required:true,
    },
    createdByModel:{
        type:String,
        required:true,
        enum:['Admin','Faculty']
    },
    department:{
        type:mongoose.Schema.Types.objectId,
        ref:"Department",
        default:null,
    },
    isGlobal:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

export const Notice = mongoose.model("Notice",noticeSchema);
