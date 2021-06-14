import { Router, Request, Response, NextFunction } from "express";
import { UserAttributes } from "../types/userAttributes";
import { userSchema } from "../validation";
import { validateSchema, BadRequestError } from "../utils";
import { User } from "../data-access";

const userRouter = Router();
const userDto = new User();

userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { loginSubstring, limit = 10 } = req.query;
        const users = await userDto.getUsers(loginSubstring as string, limit as number);
        return res.json(users);
    } catch (error) {
        next(new BadRequestError(400, 'Users not found'));
    }
});

userRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await userDto.getUserById(id);
        if(user) {
            return res.json(user);
        }
        next(new BadRequestError(400, 'user with id not found'));
    } catch (error) {
        next(new BadRequestError(400, 'user not found'));
    }
});

userRouter.put('/users/:id', validateSchema(userSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await userDto.updateUser(id, req.body);
        if(user[0] === 1) {
            return res.json({ message: 'user updated successfully' });
        }
        next(new BadRequestError(400, 'User not found'));
    } catch (error) {
        next(new BadRequestError(400, 'User not found'));
    }
});

userRouter.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await userDto.deleteUser(id);
        return res.status(200).send();
    } catch (error) {
        next(new BadRequestError(400, 'User not found'));
    }
});

userRouter.post('/users', validateSchema(userSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userDto.saveUser(req.body as UserAttributes);
        return res.json(user);
    } catch (error) {
        next(new BadRequestError(400, 'Something went wrong'));
    }
});

export default userRouter;
