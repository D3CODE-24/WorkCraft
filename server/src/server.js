import express from "express";
import stripe from "stripe";
import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

dotenv.config({ path: "./.envrc" });
const { PORT, MONGO_URL } = process.env;
import { connectDB } from "#utils";
connectDB(MONGO_URL);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});

const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

export { cloudinary, Stripe };
