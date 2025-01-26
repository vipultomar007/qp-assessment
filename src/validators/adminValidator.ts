import * as yup from "yup";
import { ObjectSchema } from "yup";

export const addGroceryItemSchema: ObjectSchema<any> = yup.object({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: yup.string().optional(),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),
});

// Update Grocery Item Schema
export const updateGroceryItemSchema: ObjectSchema<any> = yup.object({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: yup.string().optional(),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),
});

// Patch Inventory Schema
export const patchInventorySchema: ObjectSchema<any> = yup.object({
  quantity: yup.number().optional().min(0, "Quantity cannot be negative"),
});
