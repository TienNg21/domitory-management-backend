import { HttpStatus } from "../constant.js";

class SuccessResponse {
    constructor(data = {}) {
        return {
            code: HttpStatus.OK,
            data
        }
    }
}

export default SuccessResponse;