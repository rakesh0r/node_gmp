import joi from "joi";

export const groupSchema = joi.object().keys({
    id: joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).required(),
    name: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    permissions: joi.array().items(joi.string())
});

export const groupUpdateSchema = joi.object().keys({
    id: joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }),
    name: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    permissions: joi.array().items(joi.string())
});