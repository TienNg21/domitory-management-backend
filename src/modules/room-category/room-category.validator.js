import Joi from "joi";

const getRoomCategoryById = {
   params: Joi.object({
      roomCategoryId: Joi.number().positive().required(),
   }),
};
const createRoomCategory = {
   body: Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      capacity: Joi.number().positive().required(),
      priceRoom: Joi.number().positive().required(),
   }),
};
const updateRoomCategoryById = {
   params: Joi.object({
      roomCategoryId: Joi.number().positive().required(),
   }),
   body: Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      capacity: Joi.number().positive().required(),
      priceRoom: Joi.number().positive().required(),
   }),
};
const deleteRoomCategoryById = {
   params: Joi.object({
      roomCategoryId: Joi.number().positive().required(),
   }),
};
export {
   getRoomCategoryById,
   createRoomCategory,
   updateRoomCategoryById,
   deleteRoomCategoryById,
};
