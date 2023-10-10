import Joi from "joi";
// "name",
// "buildingId",
// "capacity",
// "price",
const create = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
   }),
   body: Joi.object({
      name: Joi.string().trim().required(),
      roomCategoryId: Joi.number().integer().required(),
   }),
};
const update = {
   params: Joi.object({
      roomId: Joi.number().integer().required(),
   }),
   body: Joi.object({
      name: Joi.string().trim().required(),
      buildingId: Joi.number().integer().required(),
      roomCategoryId: Joi.number().integer().required(),
   }),
};
const getById = {
   params: Joi.object({
      roomId: Joi.number().integer().required(),
   }),
};
const getAllRoomsByBuildingId = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
   }),
};
const softDeleteById = {
   params: Joi.object({
      roomId: Joi.number().integer().required(),
   }),
};
const getListRoom = {
   query: Joi.object({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
      keyword: Joi.string().trim(),
      buildingId: Joi.number().integer(),
   }),
};
export {
   create,
   update,
   getById,
   softDeleteById,
   getAllRoomsByBuildingId,
   getListRoom,
};
