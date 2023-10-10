import userService from "../../user/services/user.service.js";
import { UserStatus } from "../../../constant.js";
import tokenService from './token.service.js';
import { TokenType } from "../../../constant.js";

const refreshTokens = async (refreshToken) => {
    try {
        const verifiedToken = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
        if (!verifiedToken) {
            return '';
        }
        const user = await userService.getUserById(verifiedToken.dataValues.userId);
        if (user) {
            return [user, await tokenService.generateAuthTokens(user)];
        }
        return '';
    } catch (error) {
        throw error;
    }
}

const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyResult = await tokenService.verifyToken(verifyEmailToken, TokenType.ACTIVE_EMAIL);
        if (verifyResult) {
            const user = await userService.getUserById(verifyResult.dataValues.userId);
            if (user) {
                await userService.updateUserById(verifyResult.dataValues.userId, { status: UserStatus.ACTIVE })
            }
            return user;
        }
        return verifyResult
    } catch (error) {
        throw error;
    }
}
export default {
    refreshTokens,
    verifyEmail
}