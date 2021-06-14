import { User as UserModel, Group as GroupModel} from '../models';
import { UserAttributes } from '../types/userAttributes';
import { Op } from 'sequelize';
import Base from './base';
class User extends Base {
    constructor() {
        super(UserModel)
    }

    async getUsers(login: string, limit: number) {
        const filters: any = {
            isdeleted: false,
        };
        
        if (login) {
            filters['login'] = {[Op.substring]: login };
        }
    
        return await super.findAll({ where: filters , limit, include: GroupModel});
    }

    async getUserById(id: string) {
        return await super.findOne({ where: { id } });
    }

    async getUserByLogin({username, password}: { username: string, password: string }) {
        return await super.findOne({ where: { login: username, password } });
    }

    async saveUser(user: UserAttributes) {
        return await super.create(user);
    }

    async updateUser(id: string, user : UserAttributes) {
        return await super.update({ ...user }, {
            where: {
                id
            }
        });
    }

    async deleteUser(id: string) {
        return await super.update({ isdeleted: true }, {
            where: {
                id
            }
        });
    }
}

export default User; 
