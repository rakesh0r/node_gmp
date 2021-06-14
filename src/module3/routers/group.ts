import { Router, Request, Response, NextFunction } from "express";
import { groupSchema, groupUpdateSchema } from "../validation";
import { validateSchema, BadRequestError } from "../utils";
import { Group } from "../data-access";

const groupRouter = Router();
const groupDto = new Group();

groupRouter.get('/groups', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await groupDto.findAll();
        return res.json(groups);
    } catch (error) {
        next(new BadRequestError(400, 'groups not found'));
    }
});

groupRouter.get('/group/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const group = await groupDto.findByPk(id);
        return res.json(group);
    } catch (error) {
        next(new BadRequestError(400, 'group not found'));
    }
});

groupRouter.put('/group/:id', validateSchema(groupUpdateSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const group = await groupDto.update(id, req.body);
        if(group[0] === 1) {
            return res.json({ message: 'group updated successfully' });
        }
        next(new BadRequestError(400, 'group not found'));
    } catch (error) {
        next(new BadRequestError(400, 'group not found'));
    }
});

groupRouter.delete('/group/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await groupDto.delete(id);
        return res.status(200).send();
    } catch (error) {
        next(new BadRequestError(400, 'group not found'));
    }
});

groupRouter.post('/group', validateSchema(groupSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await groupDto.create(req.body);
        return res.json(group);
    } catch (error) {
        next(new BadRequestError(400, 'something went wrong'));
    }
});

groupRouter.post('/add-users-to-group', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId, userIds } = req.body;
        const users = await groupDto.addUsersToGroup(groupId, userIds);
        return res.json(users);
    } catch (error) {
        next(new BadRequestError(400, 'group not found'));
    }
})

export default groupRouter;
