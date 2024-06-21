import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoUrl = process.env.MONGODB_URL ? process.env.MONGODB_URL : "mongodb://localhost:27017/participants";

export async function connect() {
  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    throw error;
  }
}

export async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Error disconnecting from the database: ${error}`);
    throw error;
  }
}
