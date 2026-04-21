import express from "express";

import upload from "../middleware/upload.js";
import { CreateSubCategory } from "../Controller/SubCategory.controller.js";

const router = express.Router()


router.route("/Create").post(upload.single("file"), CreateSubCategory)

export default router;