import { HttpStatus } from "../constant.js";

class ErrorResponse {
    constructor(code, message) {
        return {
            code: code || HttpStatus.INTERNAL_SERVER_ERROR,
            message: message
        }
    }
}

export default ErrorResponse;