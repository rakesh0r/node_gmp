import { Router, Request, Response, NextFunction } from "express";
import config from "../config";
import { loginSchema } from "../validation";
import { validateSchema, BadRequestError } from "../utils";
import { User } from "../data-access";

const jwt = require('jsonwebtoken');

const loginRouter = Router();
const userDto = new User();

loginRouter.post('/login', validateSchema(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userDto.getUserByLogin(req.body);
        if(user) {
            const token = jwt.sign(user.toJSON(), config.jwtSecret, {expiresIn: 120});
            return res.json({token});
        }
        next(new BadRequestError(401, 'Bad username/password'));
    } catch (error) {
        next(new BadRequestError(401, error.message));
    }
});

export default loginRouter;
