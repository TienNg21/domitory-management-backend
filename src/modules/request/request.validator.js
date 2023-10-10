import Joi from 'joi';
import { RequestStatus, RequestType } from '../../constant.js';

const createRequest = {
    body: Joi.object({
        roomId: Joi.number().positive().required(),
        type: Joi.string().valid(...Object.values(RequestType)).required(),
    })
}
const studentUpdateRequest = {
    body: Joi.object({
        roomId: Joi.number().positive().required(),
        type: Joi.string().valid(...Object.values(RequestType)).required(),
    }),
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}
const updateRequestStatus = {
    body: Joi.object({
        status: Joi.string().valid(...Object.values(RequestStatus)).required(),
    }),
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}

const deleteRequest = {
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}
export default {
    createRequest,
    studentUpdateRequest,
    updateRequestStatus,
    deleteRequest
}