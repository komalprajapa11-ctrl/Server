import User from "../Module/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const Isuser = await User.findOne({ email });
        if (Isuser) {
            return res.status(400).json({
                message: "User Exist"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedpassword })
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        console.error("CreateUser Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const ISvalidUser = await User.findOne({ email })
        if (!ISvalidUser) {
            return res.status(201).json({
                message: "User Not Found"
            })
        }


        const iscorrect = await bcrypt.compare(password, ISvalidUser.password)
        if (!iscorrect) {
            return res.status(201).json({
                message: "Invalid password "
            })
        }

        const accessToken = jwt.sign(
            { _id: ISvalidUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        )

        const refreshToken = jwt.sign(
            { _id: ISvalidUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(201).json({
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            _id: ISvalidUser._id,
            name: ISvalidUser.name,
            email: ISvalidUser.email
        })

    }
    catch (e) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}