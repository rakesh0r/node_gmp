import { User, Group as GroupModel } from '../models';
import { Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import Base from './base';


class Group extends Base {
    constructor() {
        super(GroupModel)
    }

    async update(id: string, obj: any) {
        return await super.update({ ...obj }, {
            where: {
                id
            }
        });
    }

    async delete(id: string) {
        return await super.delete({
            where: {
                id
            }
        });
    }

    async addUsersToGroup(groupId: string, userIds: string[]) {
        try {
            const group = await super.findByPk(groupId);
            const users = await User.findAll({
                where: {
                    id: { [Op.in]: userIds }
                },
                include: GroupModel,
            });
            if (group) {
                const updatedUsers = await sequelize.transaction(async (t) => {
                    const results = await Promise.all(users.map(async (user: any) => await user.addGroup(group, { transaction: t })));
                    return results;
                });
            
                return updatedUsers;
            }

            throw new Error('Group not found');

        } catch (error) {
            return error;
        }
    }
}

export default Group; 
