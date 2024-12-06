import mongoose, { Schema } from "mongoose";

const gallerySchema = new mongoose.Schema({
    imageFor:{type:String,required:true},
    imageURL:{type:String,required:true}
})

export const Gallery = mongoose.model("Gallery",gallerySchema)