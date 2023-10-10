import Joi from "joi";

const create = {
   body: Joi.object({
      name: Joi.string().trim().required(),
      address: Joi.string().trim().required(),
      numberOfFloor: Joi.number().positive().required(),
   }),
};
const update = {
   params: Joi.object({
      buildingId: Joi.required(),
   }),
   body: Joi.object({
      name: Joi.string().trim().required(),
      address: Joi.string().trim().required(),
      numberOfFloor: Joi.number().positive().required(),
   }),
};
const getById = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
   }),
};
const softDeleteById = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
   }),
};

const getBuildingList = {
   query: Joi.object({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
      keyword: Joi.string().trim(),
   }),
};
export { create, update, getById, softDeleteById, getBuildingList };
