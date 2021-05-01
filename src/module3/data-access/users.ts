import UserModel from '../models/user';
import { UserAttributes } from '../types/userAttributes';
import { Op } from 'sequelize';

export const getUsers = async (login: string, limit: number) => {
    const filters: any = {
        isdeleted: false,
    };
    
    if (login) {
        filters['login'] = {[Op.substring]: login };
    }

    return await UserModel.findAll({ where: filters , limit});
}

export const getUserById = async (id: string) => {
    return await UserModel.findOne({ where: { id } });
}

export const saveUser = async (user: UserAttributes) => {
    return await UserModel.create(user);
}

export const updateUser = async (id: string, user : UserAttributes) => {
    console.log(id);
    return await UserModel.update({ ...user }, {
        where: {
            id
        }
    });
}

export const deleteUser = async (id: string) => {
    return await UserModel.update({ isdeleted: true }, {
        where: {
            id
        }
    });
}
