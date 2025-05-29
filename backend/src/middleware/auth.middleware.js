import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token,"==token")
            if(!token) {
                return res.status(401).json({message: "Unauthorized - No token"});
            }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decode,"==decode")
            if(!decode) {
                return res.status(401).json({message: "Unauthorized - Invalid token"});
            }

        const user = await User.findById(decode.userID).select("-password");
        console.log(user,"==user")   
            if(!user) {
                return res.status(401).json({message: "Unauthorized - User not found"});
            }
        
        req.user = user;    
        
        next();
     
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({message: "Internal server error"});
    }
}