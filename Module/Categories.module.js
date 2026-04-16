import mongoose from "mongoose";

const Categories = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Category already exists"],
        trim: true,
        uppercase: true,
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

export default mongoose.model("Categories", Categories)