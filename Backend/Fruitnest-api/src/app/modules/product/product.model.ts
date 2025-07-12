//  imgUrl: string;
//   title: string;
//   price: number;
//   description: string;
//   quantity: number;
//   inStock: boolean;

import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    imgUrl: {
      type: String,
      required: [true, "Image url is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be greater than or equal to 0"],
    },
    inStock: {
      type: Boolean,
      required: [true, "InStock status is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>("Product", productSchema);
