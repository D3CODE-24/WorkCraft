import express from "express";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

dotenv.config({ path: "./.envrc" });
const { PORT, MONGO_URL } = process.env;
import { connectDB } from "#utils";
connectDB(MONGO_URL);

app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});
