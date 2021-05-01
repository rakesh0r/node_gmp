import { Router, Request, Response } from "express";
import { groupSchema, groupUpdateSchema } from "../validation";
import { validateSchema } from "../utils";
import { Group } from "../data-access";

const groupRouter = Router();
const groupDto = new Group();

groupRouter.get('/groups', async (req: Request, res: Response) => {
    const groups = await groupDto.findAll();
    return res.json(groups);
});

groupRouter.get('/group/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const group = await groupDto.findByPk(id);
        return res.json(group);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'groupnot found' });
    }
});

groupRouter.put('/group/:id', validateSchema(groupUpdateSchema), async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const group = await groupDto.update(id, req.body);
        if(group[0] === 1) {
            return res.json({ message: 'group updated successfully' });
        } else {
            return res.status(400).json({ message: 'group not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'group not found' });
    }
});

groupRouter.delete('/group/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await groupDto.delete(id);
    return res.status(200).send();
});

groupRouter.post('/group', validateSchema(groupSchema), async (req: Request, res: Response) => {
    try {
        const group = await groupDto.create(req.body);
        return res.json(group);
    } catch (error) {
        console.log(error); 
        return res.status(400).json({ message: 'something went wrong' });
    }
});

groupRouter.post('/add-group-to-users', async (req: Request, res: Response) => {
    const { groupId, userIds } = req.body;
    const users = await groupDto.addUsersToGroup(groupId, userIds);
    return res.json(users);
})

export default groupRouter;
