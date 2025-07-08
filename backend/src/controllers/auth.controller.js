import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";


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

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = new User({
      fullName,
      email,
      password, 
      profilePic: randomAvatar,
    });

    await newUser.save();

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created ${newUser.fullName}`);
    } catch (error) {
      console.error("Error creating Stream user:", error);
    }
    const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET_KEY, {expiresIn: "2h"});

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
      password: newUser.password,
      profilePic: newUser.profilePic,
    };

    res.status(201).json({ success: true, user: userToReturn });
  } catch (error) {
    console.log("error in signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({message:"All fields are required"});
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password"});
    }
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log("error in login", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req, res) {
 try {
  const userId = req.user._id;
  const {fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
 
  if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
    return res.status(400).json({
      message: "All fields are required",
      missingFields: [
        !fullName && "fullName",
        !bio && "bio",
        !nativeLanguage && "nativeLanguage",
        !learningLanguage && "learningLanguage",
        !location && "location",
      ],
    });
  }
  const updatedUser = await User.findOneAndUpdate(userId,{
    ...req.body,
    isOnboarded: true,
  },{new: true});
  if(!updatedUser){
    return res.status(404).json({message: "User not found"});
  }


  try {
    await upsertStreamUser({
    id: updatedUser._id.toString(),
    name: updatedUser.fullName,
    image: updatedUser.profilePic || "",
  });
  console.log(`Stream user created ${updatedUser.fullName}`);
  } catch (streamError) {
    console.log("Error creating Stream user:", streamError.message);
  }

  res.status(200).json({success: true, user: updatedUser});
   
 } catch (error) {
  console.error("Error in onboard middleware:", error);
  res.status(500).json({message: "Internal server error"});
 }
}
