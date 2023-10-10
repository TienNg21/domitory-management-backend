import moment from 'moment';
import Jwt from 'jsonwebtoken';
import db from "../../../../models/index.cjs";
const Token = db.token;
import { TokenType } from '../../../constant.js';
const generateToken = (user, expires, type, secret = process.env.JWT_SECRET_TOKEN) => {
    const payload = {
        id: user.id,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
        role: user.role,
        roomId: user.roomId,
    }

    return Jwt.sign(payload, secret);
}

const saveToken = async (token, userId, expires, type) => {
    try {
        return await Token.create({
            token,
            userId,
            type,
            expires
        })
    } catch (error) {
        throw error;
    }
}
const deleteToken = async (userId, type) => {
    try {
        // Hard delete
        const result = await Token.destroy({
            where: {
                userId,
                type
            }
        });
        return result;
    } catch (error) {
        throw error
    }
}
const verifyToken = async (token, type) => {
    try {
        const tokenRes = await Token.findOne({
            where: {
                token,
                type,
            }
        });
        if (tokenRes) {
            await deleteToken(tokenRes.dataValues.userId, type);
        }
        return tokenRes
    } catch (error) {
        throw error
    }
}

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(process.env.JWT_ACCESS_TOKEN_EXPIRED_IN, 'minutes');
    const accessToken = generateToken(user, accessTokenExpires, TokenType.ACCESS);

    const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_TOKEN_EXPIRED_IN, 'days');
    const refreshToken = generateToken(user, refreshTokenExpires, TokenType.REFRESH);

    await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        }
    }
}

const generateVerifyEmailToken = async (user) => {
    const expires = moment().add(process.env.JWT_VERIFY_EMAIL_TOKEN_EXPIRED_IN, 'minutes');
    const verifyEmailToken = generateToken(user, expires, TokenType.ACTIVE_EMAIL);
    await saveToken(verifyEmailToken, user.id, expires, TokenType.ACTIVE_EMAIL);
    return verifyEmailToken;
}

const generateResetPasswordToken = async (user) => {
    const expires = moment().add(process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRED_IN, 'minutes');
    const resetPasswordToken = generateToken(user, expires, TokenType.RESET_PASSWORD);
    await saveToken(resetPasswordToken, user.id, expires, TokenType.RESET_PASSWORD);
    return resetPasswordToken;
}

export default {
    generateToken,
    saveToken,
    deleteToken,
    verifyToken,
    generateAuthTokens,
    generateActiveEmailToken: generateVerifyEmailToken,
    generateResetPasswordToken
}