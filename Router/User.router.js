import express from 'express'
import { CreateUser, LoginUser } from './../Controller/User.controller.js';


export  const router = express.Router()

router.route("/Register").post(CreateUser)

router.route("/Login").post(LoginUser)


