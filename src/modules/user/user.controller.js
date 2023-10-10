import { HttpStatus, UserRole, UserStatus } from "../../constant.js";
import userService from "./services/user.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
import * as roomService from "../room/services/room.service.js";
import { hashString, checkHashedString } from "../../middlewares/bcrypt.js";
const getProfile = async (req, res, next) => {
   try {
      const userProfile = await userService.getUserById(req.user.id);
      delete userProfile.dataValues.password;
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse(userProfile.dataValues));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const updateProfile = async (req, res) => {
   try {
      const userId = req.user.id;
      const body = req.body;
      await userService.updateUserById(userId, body);
      const updatedUser = await userService.getUserById(userId);
      delete updatedUser.dataValues.password;
      return res.status(HttpStatus.OK).json(new SuccessResponse(updatedUser));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const changePassword = async (req, res) => {
   try {
      const userId = req.user.id;
      const { newPassword, oldPassword } = req.body;
      const currentUser = await userService.getUserById(userId);
      if (
         !currentUser ||
         !checkHashedString(oldPassword, currentUser.password)
      ) {
         res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.BAD_REQUEST, "Invalid password")
         );
         return;
      }

      await userService.updateUserById(userId, {
         password: hashString(newPassword),
      });
      const updatedUser = await userService.getUserById(userId);
      delete updatedUser.dataValues.password;
      return res.status(HttpStatus.OK).json(new SuccessResponse(updatedUser));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const createUser = async (req, res) => {
   const isEmailExist = await userService.getUserByEmail(req.body.email);
   if (isEmailExist) {
      res.status(HttpStatus.BAD_REQUEST).json(
         new ErrorResponse(HttpStatus.BAD_REQUEST, "Email is already existed")
      );
      return;
   }

   const newUser = await userService.createUser({
      ...req.body,
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
   });
   return res.status(HttpStatus.OK).json(new SuccessResponse(newUser));
};

const getUserList = async (req, res) => {
   try {
      const userList = await userService.getUserList(req.query);
      return res.status(HttpStatus.OK).json(new SuccessResponse(userList));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const updateUser = async (req, res) => {
   try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (!user) {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(HttpStatus.ITEM_NOT_FOUND, {
               key: "userId",
               message: "Not found user",
            })
         );
      }
      if (user.role === UserRole.ADMIN && req.user.role === UserRole.ADMIN) {
         res.status(HttpStatus.FORBIDDEN).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "userId",
               message: "Cannot update another admin",
            })
         );
      }
      await userService.updateUserById(userId, req.body);
      const updatedUser = await userService.getUserById(userId);
      delete updatedUser.dataValues.password;
      return res.status(HttpStatus.OK).json(new SuccessResponse(updatedUser));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
// user for inactive an user => process related room
// TODO: Update after
const updateUserStatus = async (req, res) => {
   try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (!user) {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(HttpStatus.ITEM_NOT_FOUND, {
               key: "userId",
               message: "Not found user",
            })
         );
      }
      if (user.role === UserRole.ADMIN && req.user.role === UserRole.ADMIN) {
         res.status(HttpStatus.FORBIDDEN).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "userId",
               message: "Cannot update another admin",
            })
         );
      }
      await userService.updateUserById(userId, req.body);
      const updatedUser = await userService.getUserById(userId);
      delete updatedUser.dataValues.password;
      return res.status(HttpStatus.OK).json(new SuccessResponse(updatedUser));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const deleteUser = async (req, res) => {
   try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (!user) {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(HttpStatus.ITEM_NOT_FOUND, {
               key: "userId",
               message: "Not found user",
            })
         );
      }
      await userService.softDeleteUserById(userId);
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse({ id: userId }));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const getUserByRoomId = async (req, res) => {
   try {
      const isRoomExisted = await roomService.getRoomById(req.params.roomId);
      if (!isRoomExisted) {
         return res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "roomId",
               message: "Room not exist",
            })
         );
      }
      let userList = await userService.getUserByRoomId(req.params.roomId);
      userList = userList.map((user) => {
         delete user.dataValues.password;
         return user;
      });
      return res.status(HttpStatus.OK).json(
         new SuccessResponse({
            items: userList,
            totalItems: userList.length,
         })
      );
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

export default {
   getProfile,
   updateProfile,
   changePassword,
   getUserList,
   updateUser,
   updateUserStatus,
   deleteUser,
   getUserByRoomId,
   createUser,
};
