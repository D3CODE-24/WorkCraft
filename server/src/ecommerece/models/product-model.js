import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
  },
  description: {
    type: String,
    required: [true, "can't be blank"],
  },
  price: {
    type: String,
    required: [true, "can't be blank"],
  },
  category: {
    type: String,
    required: [true, "can't be blank"],
  },
  pictures: {
    type: Array,
    required: true,
  },
  manufacturer: {
    type: String,
    required: [true, "can't be blank"],
  },
  pictures: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Product", ProductSchema);
