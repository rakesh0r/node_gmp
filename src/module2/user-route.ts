import express, { Request, Response, NextFunction } from "express";
import joi from "joi";
import { User } from "./user";

const userRouter = express.Router();

const userSchema = joi.object().keys({
    id: joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).required(),
    login: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    age: joi.number().integer().min(4).max(130).required(),
    isDeleted: joi.boolean().required(),
});

const users: User[] = [
    { id: '30a7863b-7e0a-47b7-8559-6a20cd431aca', login: 'rakesh', password: 'rakesh', age: 20, isDeleted: false },
    { id: '30a7863b-7e0a-47b7-8559-6a20cd431acb', login: 'max', password: 'rakesh', age: 22, isDeleted: false },
];

const validateSchema = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
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

const getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] => {
    const filteredUsers: User[] = users.filter((user: User) => user.login.indexOf(loginSubstring) > -1);
    return filteredUsers.slice(0, limit);
}

userRouter.get('/users', (req: Request, res: Response) => {
    const { loginSubstring, limit = 10 } = req.query;
    if (loginSubstring) {
        return res.json(getAutoSuggestUsers(loginSubstring as string, limit as number));
    }
    return res.json(users);
});

userRouter.get('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(400).json({ message: 'user not foound' });
    }
});

userRouter.put('/users/:id', validateSchema(userSchema), (req: Request, res: Response) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
        const user = { ...users[userIndex], ...req.body };
        users[userIndex] = user;
        return res.json(user);
    } else {
        return res.status(400).json({ message: 'user not foound' });
    }
});

userRouter.delete('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
        users[userIndex].isDeleted = true;
    }
    return res.status(200).send();
});

userRouter.post('/users', validateSchema(userSchema), (req: Request, res: Response) => {
    users.push(req.body as User);

    return res.status(204).send();
});

export default userRouter;
