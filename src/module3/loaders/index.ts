import expressLoader from './express';
import sequelizeLoader, { sequelize } from './sequelize';
import Logger from './logger';

export default async ({ expressApp }: { expressApp : any}) => {

    await sequelizeLoader();
    
    await expressLoader({ app: expressApp });
};

export {
    sequelize,
    Logger
};
