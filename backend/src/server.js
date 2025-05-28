import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use("/app/auth",authRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
