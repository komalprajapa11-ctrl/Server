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

    },
    description: {
        type: String,
    },
    statuss: {
        type: Boolean,
        default: true,
        enum: [true, false]


    }
})

export default mongoose.model("Categories", Categories)