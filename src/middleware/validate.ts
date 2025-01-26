import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

export const validate = (schema: ObjectSchema<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err: any) {
      res.status(400).json({
        message: "Validation error",
        errors: err.errors,
      });
    }
  };
};
