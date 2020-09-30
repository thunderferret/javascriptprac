import mongoose, { MongooseDocument } from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl:{
        type : String,
        required: "File URL is required"
    },
    title:{
        type : String,
        required: "Title of the Video is Required"
    },
    description:String,
    views:{
        type:Number,
        default:0
    },
    createdAt : {
        type:Date,
        default:Date.now
    }
});

const model = mongoose.model("Video",VideoSchema);
export default model;