import Joi from 'joi';
import { MIN_PASSWORD_CHARACTER } from '../../constant.js';

const register = {
    body: Joi.object({
        email: Joi.string().lowercase().required().trim(),
        password: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
        name: Joi.string().required().trim(),
        studentCode: Joi.string().required().trim(),
    })
};

const login = {
    body: Joi.object({
        email: Joi.string().lowercase().required().trim(),
        password: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
    })
};

const refreshTokens = {
    body: Joi.object({
        refreshToken: Joi.string().required()
    })
};

const forgotPassword = {
    body: Joi.object({
        email: Joi.string().required(),
    })
}

const resetPassword = {
    body: Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
    })
}

const sendVerificationEmail = {
    body: Joi.object({
        email: Joi.string().lowercase().required().trim(),
    })
}

const verifyEmail = {
    body: Joi.object({
        token: Joi.string().required(),
    })
}

export default {
    register,
    login,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail
}