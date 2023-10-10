import { HttpStatus } from '../constant.js';
import ErrorResponse from '../utils/ErrorResponse.js'
export const checkUserRole = (userRoles) => {
    return (req, res, next) => {
        if (userRoles.includes(req.user.role)) {
            return next()
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json(new ErrorResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized'));
        }
    }
}