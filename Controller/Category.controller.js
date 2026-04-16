import cloudinary from "../config/cloudinary.js";
import CategoriesModule from "../Module/Categories.module.js";
import fs from "fs";

export const CreateCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        console.log("Body:", req.body);
        console.log("File:", req.file);

        let ImageURL = ""

        if (req.file) {
            try {
                const upload = await cloudinary.uploader.upload(req.file.path, {
                    folder: "Categories"
                })

                ImageURL = upload.secure_url
                console.log("Cloudinary URL:", ImageURL);

                // Clean up file after upload
                fs.unlinkSync(req.file.path)
            } catch (err) {
                console.error("Cloudinary Error:", err);
                return res.status(500).json({
                    message: "Cloudinary upload failed",
                    error: err.message
                })
            }
        }

        const category = await CategoriesModule.create({ 
            name, 
            Image: ImageURL, 
            description 
        })

        return res.status(201).json({
            message: "Category Created Successfully",
            category
        })

    }
    catch (e) {
        console.error("CreateCategory Error:", e);

        // Check for duplicate key error (code 11000)
        if (e.code === 11000) {
            return res.status(400).json({
                message: "Category with this name already exists",
                error: e.message
            })
        }

        res.status(500).json({
            message: "Internal Server Error",
            error: e.message
        })
    }
}