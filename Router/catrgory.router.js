import express from "express";
import { CreateCategory } from "../Controller/Category.controller.js";
import uplod from "../middleware/upload.js";

const router = express.Router()


router.route("/Create").post(uplod.single("image"), CreateCategory)

export default router;