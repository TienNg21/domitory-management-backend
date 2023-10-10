import Joi from "joi";
import {
   MIN_PASSWORD_CHARACTER,
   UserRole,
   UserStatus,
} from "../../constant.js";

const updateProfile = {
   body: Joi.object({
      name: Joi.string().required().trim(),
      studentCode: Joi.string().required().trim(),
      generation: Joi.string().required().trim(),
      phoneNumber: Joi.string().trim().optional(),
      ethnic: Joi.string().trim().optional(),
      religion: Joi.string().trim().optional(),
      gender: Joi.string().trim().optional(),
      faculty: Joi.string().trim().optional(),
      majors: Joi.string().trim().optional(),
   }),
};

const changePassword = {
   body: Joi.object({
      oldPassword: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
      newPassword: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
   }),
};

const createUser = {
   body: Joi.object({
      email: Joi.string().lowercase().required().trim(),
      password: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
      name: Joi.string().required().trim(),
      studentCode: Joi.string().required().trim(),
      generation: Joi.string().required().trim(),
      phoneNumber: Joi.string().trim().optional(),
      ethnic: Joi.string().trim().optional(),
      religion: Joi.string().trim().optional(),
      gender: Joi.string().trim().optional(),
      faculty: Joi.string().trim().optional(),
      majors: Joi.string().trim().optional(),
   }),
};

const getUserList = {
   query: Joi.object({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
      keyword: Joi.string().trim(),
      role: Joi.array().items(Joi.string().valid(...Object.values(UserRole))),
      status: Joi.array().items(
         Joi.string().valid(...Object.values(UserStatus))
      ),
   }),
};

const updateUser = {
   params: Joi.object({
      id: Joi.number().positive().required(),
   }),
   body: Joi.object({
      name: Joi.string().required().trim(),
      studentCode: Joi.string().required().trim(),
      generation: Joi.string().required().trim(),
      phoneNumber: Joi.string().trim().optional(),
      ethnic: Joi.string().trim().optional(),
      religion: Joi.string().trim().optional(),
      gender: Joi.string().trim().optional(),
      faculty: Joi.string().trim().optional(),
      majors: Joi.string().trim().optional(),
   }),
};

const updateUserStatus = {
   params: Joi.object({
      id: Joi.number().positive().required(),
   }),
   body: Joi.object({
      status: Joi.string()
         .valid(...Object.values(UserStatus))
         .required(),
   }),
};

const deleteUser = {
   params: Joi.object({
      id: Joi.number().positive().required(),
   }),
};

const getUserByRoomId = {
   params: Joi.object({
      roomId: Joi.number().positive().required(),
   }),
};
export default {
   updateProfile,
   changePassword,
   getUserList,
   deleteUser,
   updateUser,
   updateUserStatus,
   getUserByRoomId,
   createUser,
};
