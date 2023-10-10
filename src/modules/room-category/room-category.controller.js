import { HttpStatus } from "../../constant.js";
import * as roomCategoryService from "./services/room-category.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";

const getRoomCategoryById = async (req, res, next) => {
   try {
      const roomCategory = await roomCategoryService.getRoomCategoryById(
         req.params.roomCategoryId
      );
      if (roomCategory) {
         return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(roomCategory));
      } else {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "Not found room category"
               )
            );
      }
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const createRoomCategory = async (req, res, next) => {
   try {
      const roomCategory = await roomCategoryService.createRoomCategory(
         req.body
      );
      if (roomCategory) {
         return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(roomCategory));
      } else {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "create room category failed"
               )
            );
      }
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const updateRoomCategoryById = async (req, res, next) => {
   try {
      const roomCategory = await roomCategoryService.getRoomCategoryById(
         req.params.roomCategoryId
      );
      if (roomCategory) {
         const rowAffect = await roomCategoryService.updateRoomCategoryById(
            req.params.roomCategoryId,
            req.body
         );
         if (rowAffect) {
            const roomCategoryUpdate =
               await roomCategoryService.getRoomCategoryById(
                  req.params.roomCategoryId
               );
            return res
               .status(HttpStatus.OK)
               .json(new SuccessResponse(roomCategoryUpdate));
         }
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "update room category failed"
               )
            );
      }
      return res
         .status(HttpStatus.NOT_FOUND)
         .json(
            new ErrorResponse(
               HttpStatus.ITEM_NOT_FOUND,
               "not found room category"
            )
         );
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const getListRoomCategory = async (req, res, next) => {
   try {
      const roomCategoryList = await roomCategoryService.getListRoomCategory();
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse(roomCategoryList));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const deleteRoomCategoryById = async (req, res, next) => {
   try {
      const roomCategory = await roomCategoryService.getRoomCategoryById(
         req.params.roomCategoryId
      );
      if (roomCategory) {
         const rowAffect = await roomCategoryService.deleteRoomCategoryById(
            req.params.roomCategoryId
         );
         if (rowAffect) {
            return res
               .status(HttpStatus.OK)
               .json(new SuccessResponse(req.params.roomCategoryId));
         } else {
            return res
               .status(HttpStatus.NOT_FOUND)
               .json(
                  new ErrorResponse(
                     HttpStatus.BAD_REQUEST,
                     "delete room category failed"
                  )
               );
         }
      }
      return res
         .status(HttpStatus.NOT_FOUND)
         .json(
            new ErrorResponse(
               HttpStatus.ITEM_NOT_FOUND,
               "not found room category"
            )
         );
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
export {
   getRoomCategoryById,
   createRoomCategory,
   updateRoomCategoryById,
   getListRoomCategory,
   deleteRoomCategoryById,
};
