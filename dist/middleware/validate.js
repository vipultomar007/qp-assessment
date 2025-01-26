"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        }
        catch (err) {
            res.status(400).json({
                message: "Validation error",
                errors: err.errors,
            });
        }
    };
};
exports.validate = validate;
