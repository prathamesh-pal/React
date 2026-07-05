import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");
  };


export default connectDB ;