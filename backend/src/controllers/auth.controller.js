import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

export async function signup(req, res) {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        if (password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters");
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profilePic: randomAvatar,
        });

        const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "2h",
        });

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        const userToReturn = {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        };

        res.status(201).json({ success: true, user: userToReturn });
    } catch (error) {
        console.log("error in signup", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function login (req, res) {
    res.send("login");
}

export async function logout (req, res) {
    res.send("logout");
}
