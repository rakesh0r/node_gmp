import joi from "joi";

export const userSchema = joi.object().keys({
    id: joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).required(),
    login: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    age: joi.number().integer().min(4).max(130).required(),
    isdeleted: joi.boolean().required(),
});