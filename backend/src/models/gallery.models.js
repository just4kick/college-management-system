import mongoose, { Schema } from "mongoose";

const gallerySchema = new mongoose.Schema({
    imageFor:{type:String,required:true},
    imageURL:{type:String,required:true},
    isGlobal:{ type: Boolean, default: false },
})

export const Gallery = mongoose.model("Gallery",gallerySchema)