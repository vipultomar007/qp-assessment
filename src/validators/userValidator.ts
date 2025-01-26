import * as yup from "yup";
import { ObjectSchema } from "yup";

// Schema to validate placing an order
export const placeOrderSchema: ObjectSchema<any> = yup.object({
  userId: yup.string().required("User ID is required"),
  items: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required("Item ID is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
      })
    )
    .required("Items are required"),
});
