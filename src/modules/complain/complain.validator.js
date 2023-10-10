import Joi from "joi";
import { ComplainType, ComplainLevel, RequestStatus } from "../../constant.js";
const createComplain = {
   body: Joi.object({
      type: Joi.string()
         .valid(...Object.values(ComplainType))
         .optional(),
      level: Joi.string()
         .valid(...Object.values(ComplainLevel))
         .optional(),
      content: Joi.string().required(),
   }),
};
const getComplainList = {
   query: Joi.object().keys({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
      type: Joi.string()
         .valid(...Object.values(ComplainType))
         .optional(),
      level: Joi.string()
         .valid(...Object.values(ComplainLevel))
         .optional(),
      status: Joi.string()
         .valid(...Object.values(RequestStatus))
         .optional(),
   }),
};
const updateComplain = {
   params: Joi.object().keys({
      id: Joi.number().positive(),
   }),
   body: Joi.object().keys({
      status: Joi.string()
         .valid(...Object.values(RequestStatus))
         .optional(),
      response: Joi.string().optional().allow(""),
   }),
};
export { createComplain, getComplainList, updateComplain };
