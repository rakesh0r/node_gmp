import expressLoader from './express';
import sequelizeLoader, { sequelize } from './sequelize';

export default async ({ expressApp }: { expressApp : any}) => {

    await sequelizeLoader();
    
    await expressLoader({ app: expressApp });
};

export {
    sequelize
};
