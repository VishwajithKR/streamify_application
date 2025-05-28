import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
     const conn =   await mongoose.connect(process.env.MONGODB_URL);
        console.log(`DB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("first error", error); 
       process.exit(1);
    }
};