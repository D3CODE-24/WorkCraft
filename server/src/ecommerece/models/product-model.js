import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
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
  },
  { minimize: false },
);

export default mongoose.model("Product", ProductSchema);
