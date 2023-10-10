import { HttpStatus, TokenType, UserRole, UserStatus } from '../../constant.js';
import authService from './services/auth.service.js';
import userService from '../user/services/user.service.js';
import tokenService from './services/token.service.js';
import ErrorResponse from '../../utils/ErrorResponse.js';
import SuccessResponse from '../../utils/SuccessResponse.js';
import { checkHashedString } from '../../middlewares/bcrypt.js';
const register = async (req, res) => {
    try {
        // Check email exist
        const isEmailExist = await userService.getUserByEmail(req.body.email);
        if (isEmailExist) {
            res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.BAD_REQUEST, 'Email is already existed'));
            return;
        }

        const newUser = await userService.createUser({ ...req.body, role: UserRole.STUDENT, status: UserStatus.REGISTERING });
        // Generate token to active email
        const activeEmailToken = await tokenService.generateActiveEmailToken(newUser.dataValues);

        // TODO: Implement send email service here
        res.status(HttpStatus.OK).json(new SuccessResponse({ token: activeEmailToken, message: "Please check your email" }))
        return;
    } catch (error) {
        res.status(HttpStatus.IN).json(new ErrorResponse(HttpStatus.BAD_REQUEST, error.message))
        return;
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);

        if (!user || !checkHashedString(password, user.dataValues.password)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.INVALID_USERNAME_OR_PASSWORD, 'Invalid email or password'))
            return;
        }
        if (user.status !== UserStatus.ACTIVE) {
            res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.BAD_REQUEST, 'Inactive account or email was not verified'))
            return;
        }

        const tokens = await tokenService.generateAuthTokens(user);
        delete user.dataValues.password;
        res.status(HttpStatus.OK).json(new SuccessResponse({ user, tokens }))
        return;
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
        return;
    }
}

const refreshTokens = async (req, res, next) => {
    try {
        const [user, tokens] = await authService.refreshTokens(req.body.refreshToken);
        if (tokens) {
            delete user.password;
            res.status(HttpStatus.OK).json(new SuccessResponse({ user, tokens }))
            return;
        }
        res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.NOT_FOUND, 'Not found refresh token'));
        return;
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
        return;
    }
}

const sendVerificationEmail = async (req, res, next) => {
    try {
        const isUserExisted = await userService.getUserByEmail(req.body.email);
        if (!isUserExisted) {
            res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.BAD_REQUEST, "User does not exist"))
            return;
        }
        const activeEmailToken = await tokenService.generateActiveEmailToken(isUserExisted.dataValues);
        // TODO: Change after
        res.status(HttpStatus.OK).json(new SuccessResponse({ token: activeEmailToken, message: "Please check your email" }))
        return;
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
        return;
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const result = await authService.verifyEmail(req.body.token);
        if (!result) {
            res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.BAD_REQUEST, "Invalid token"))
            return;
        }
        delete result.dataValues.password;
        res.status(HttpStatus.OK).json(new SuccessResponse(result));
        return;
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
        return;
    }
}

export default { register, login, refreshTokens, sendVerificationEmail, verifyEmail }