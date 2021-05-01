import express, { Request, Response, NextFunction } from "express";
import { UserAttributes } from "../types/userAttributes";
import { userSchema } from "../validation";
import { validateSchema } from "../utils";
import { deleteUser, getUsers, getUserById, saveUser, updateUser } from "../data-access/users";
const userRouter = express.Router();

userRouter.get('/users', async (req: Request, res: Response) => {
    const { loginSubstring, limit = 10 } = req.query;
    const users = await getUsers(loginSubstring as string, limit as number);
    return res.json(users);
});

userRouter.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'user not found' });
    }
});

userRouter.put('/users/:id', validateSchema(userSchema), async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await updateUser(id, req.body);
        if(user[0] === 1) {
            return res.json({ message: 'user updated successfully' });
        } else {
            return res.status(400).json({ message: 'user not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'user not found' });
    }
});

userRouter.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteUser(id);
    return res.status(200).send();
});

userRouter.post('/users', validateSchema(userSchema), async (req: Request, res: Response) => {
    try {
        const user = await saveUser(req.body as UserAttributes);
        return res.json(user);
    } catch (error) {
        console.log(error); 
        return res.status(400).json({ message: 'something went wrong' });
    }
});

export default userRouter;
