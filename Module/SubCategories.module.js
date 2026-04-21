import mongoose from "mongoose";

const SubCategories = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Category already exists"],
        trim: true,
        uppercase: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true
    },
    Image: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
        enum: [true, false]
    }
}, { timestamps: true })

export default mongoose.model("SubCategories", SubCategories)