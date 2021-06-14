import joi from "joi";

export const loginSchema = joi.object().keys({
    username: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});
