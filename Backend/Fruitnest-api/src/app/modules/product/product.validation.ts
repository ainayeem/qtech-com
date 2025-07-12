//  imgUrl: string;
//   title: string;
//   price: number;
//   description: string;
//   quantity: number;
//   inStock: boolean;

import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    imgUrl: z.string().url(),
    title: z.string().min(2).max(100),
    price: z.number().min(0),
    description: z.string().min(10).max(1000),
    quantity: z.number().min(0),
    inStock: z.boolean(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    imgUrl: z.string().url().optional(),
    title: z.string().min(2).max(100).optional(),
    price: z.number().min(0).optional(),
    description: z.string().min(10).max(1000).optional(),
    quantity: z.number().min(0).optional(),
    inStock: z.boolean().optional(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
