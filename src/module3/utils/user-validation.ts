import { Request, Response, NextFunction } from "express";

export const validateSchema = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({message: "Body required"}).end();
    }

    const { error } = schema.validate(req.body, {
        abortEarly: true,
        allowUnknown: false,
    });

    if (error && error.isJoi) {
        return res.status(400).json(error.details.map((error: { message: string; }) => error.message));
    }

    next();
}
