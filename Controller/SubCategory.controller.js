
import mongoose from "mongoose"
import cloudinary from "../config/cloudinary.js"
import SubCategoriesModule from "../Module/SubCategories.module.js"
import CategoriesModule from "../Module/Categories.module.js"

export const CreateSubCategory = async (req, res) => {
  try {
    const { name, category, description } = req.body
    const file = req.file

    console.log("CreateSubCategory req.body:", req.body)
    console.log("CreateSubCategory req.file:", req.file)

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category id"
      })
    }

    const categoryExists = await CategoriesModule.findById(category)
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category does not exist"
      })
    }

    const Isexist = await SubCategoriesModule.findOne({ name })

    if (Isexist) {
      return res.status(400).json({
        success: false,
        message: "SubCategory already exists"
      })
    }

    let imageUrl = ""
    if (file) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "SubCategory"
      })
      imageUrl = upload.secure_url
    }

    const Subcategory = await SubCategoriesModule.create({
      name,
      category,
      description,
      imageUrl
    })

    return res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      Subcategory
    })
  } catch (error) {
    console.error("CreateSubCategory Error:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to create subcategory",
      error: error.message
    })
  }
}



export const GetAllSubCategories = async (req, res) => {
  try {
    const Subcategory = await SubCategoriesModule.find()

    return res.status(200).json({
      success: true,
      message: "SubCategories fetched successfully",
      Subcategory
    })

  }
  catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to get subcategories",
      error: e.message
    })
  }
}

export const GetSubCategoryById = async (req, res) => {
  try{
    const{id} =req.parms
 
    const Subca = await SubCategoriesModule.findById(id)
    return res.status(200).json({
      success: true,
      message: "SubCategory fetched successfully",
      Subca
    })
  }
  catch (e) {
    res.status(500).json({
      success: false, 
      message: "Failed to get subcategory",
      error: e.message
    })
  }
}


export const UpdateSubCategory = async (req, res) => {
  try{
      const{name ,description} = req.body
      const{id} = req.params
      const file=req.file
      const updateData = {
          name,
          description
          
      }
      let ImageUrl = ""

      if(file){
        const upload = await cloudinary.uploder.upload(file,{
        folder: "SubCategory"

        })
        ImageUrl = upload.secure_url
        updateData.imageUrl = ImageUrl
      }
      
      const Update = await SubCategoriesModule.findByIdAndUpdate(id,updateData,{
        new: true
      })
      
      return res.status(200).json({
        success: true,
        message: "SubCategory updated successfully",
        Update
      })
  }
  catch(e){
    res.status(500).json({
      success: false,
      message: "Failed to update subcategory",
      error: e.message
    })
  }
}