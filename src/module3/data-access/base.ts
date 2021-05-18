import { ModelCtor } from "sequelize";

class Base {
    model: ModelCtor<any>;
    constructor(model: ModelCtor<any>) {
        this.model = model;
    }

    async findByPk(id: string) {
        return await this.model.findByPk(id);
    }

    async findAll(filters: any = {}) {
        return await this.model.findAll(filters);
    }

    async findOne(filters: any = {}) {
        return await this.model.findOne(filters);
    }

    async create(obj: any) {
        return await this.model.create(obj);
    }

    async update(obj: any, filters: any) {
        return await this.model.update(obj, filters);
    }

    async delete(filters: any) {
        return await this.model.destroy(filters);
    }
}

export default Base;