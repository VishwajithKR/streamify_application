import User from "../models/User.js";

export async function signup (req, res) {
    const { userName, email, password } = req.body;
    try {
        if(!userName || !email || !password) {
            return res.status(400).send("All fields are required");
        }
        if(password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters");
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const idx = Math.floor(Math.random() * 100)+1;
        const   randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    } catch (error) {
        
    }
   
}

export async function login (req, res) {
    res.send("login");
}

export async function logout (req, res) {
    res.send("logout");
}