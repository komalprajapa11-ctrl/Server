import express from "express";
import { CreateCategory, GetAllCatrgory, GetByIDCatrgory, UpdateCategory } from "../Controller/Category.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router()


router.route("/Create").post(upload.single("image"), CreateCategory)
router.route("/CatrgoriesList").get(GetAllCatrgory)
router.route("/CatrgoriesList/:id").get(GetByIDCatrgory)
router.route("/CatrgoriesUpdate/:id").put(upload.single("image"), UpdateCategory)


export default router;