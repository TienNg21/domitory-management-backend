import { HttpStatus } from "../../constant.js";
import * as roomService from "./services/room.service.js";
import { getBuildingById } from "../building/services/building.service.js";
import { getRoomCategoryById } from "../room-category/services/room-category.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
import requestService from "../request/services/request.service.js";
import userService from "../user/services/user.service.js";

/**
 * Trả về phòng theo id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: thông tin phòng
 */
const getRoomById = async (req, res, next) => {
   try {
      const room = await roomService.getRoomById(req.params.roomId);
      if (room) {
         return res.status(HttpStatus.OK).json(new SuccessResponse(room));
      } else {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(new ErrorResponse(HttpStatus.BAD_REQUEST, "Not found room"));
      }
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

/**
 * Tạo mới 1 phòng
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id của phòng vừa tạo
 */
const createRoom = async (req, res) => {
   try {
      const building = await getBuildingById(req.params.buildingId);
      const roomCategory = await getRoomCategoryById(req.body.roomCategoryId);
      if (!building) {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "Not found building to create room"
               )
            );
      }
      if (!roomCategory) {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "Not found room category to create room"
               )
            );
      }
      const newRoom = await roomService.createRoom(
         req.params.buildingId,
         req.body
      );
      if (newRoom) {
         const room = await roomService.getRoomById(newRoom.id);
         return res.status(HttpStatus.OK).send(new SuccessResponse(room));
      }
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

/**
 * Cập nhật thông tin 1 phòng
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id phòng
 */
const updateRoom = async (req, res, next) => {
   try {
      const building = await getBuildingById(req.body.buildingId);
      const roomCategory = await getRoomCategoryById(req.body.roomCategoryId);
      if (!building) {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "Not found building to update"
               )
            );
      }
      if (!roomCategory) {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "Not found room category to create room"
               )
            );
      }
      const room = await roomService.getRoomById(req.params.roomId);
      if (room) {
         const rowAffect = await roomService.updateRoomById(
            req.params.roomId,
            req.body
         );
         if (rowAffect > 0) {
            const roomUpdate = await roomService.getRoomById(req.params.roomId);
            return res
               .status(HttpStatus.OK)
               .json(new SuccessResponse(roomUpdate));
         }
         return res
            .status(HttpStatus.BAD_REQUEST)
            .json(
               new ErrorResponse(HttpStatus.BAD_REQUEST, "update room failed")
            );
      } else {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "Not found room to update"
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

/**
 * xóa thông tin 1 phòng
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id phòng
 */
const softDeleteRoomById = async (req, res, next) => {
   try {
      await roomService.softDeleteRoomById(req.params.roomId);
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse(req.params.roomId));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const getAllRoomsByBuildingId = async (req, res, next) => {
   try {
      const building = await getBuildingById(req.params.buildingId);
      if (building) {
         let rooms = await roomService.getAllRoomsByBuildingId(
            req.params.buildingId
         );
         if (!rooms) rooms = [];
         return res.status(HttpStatus.OK).json(new SuccessResponse(rooms));
      } else {
         return res
            .status(HttpStatus.NOT_FOUND)
            .json(
               new ErrorResponse(HttpStatus.BAD_REQUEST, "Not found building")
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
const getListRoom = async (req, res, next) => {
   try {
      const roomList = await roomService.getListRoom(req.query);
      const list = await Promise.all(
         roomList.items.map(async (room) => {
            let numbersRequest =
               await requestService.getListRequestPendingByRoomId(room.id);
            let numberUserByRoomId = await userService.getUserByRoomId(room.id);
            room.numberOfStudentInuse =
               numbersRequest + numberUserByRoomId.length;
            return room;
         })
      );
      return res.status(HttpStatus.OK).json(
         new SuccessResponse({
            items: list,
            totalItems: roomList.totalItems,
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
export {
   getRoomById,
   createRoom,
   updateRoom,
   softDeleteRoomById,
   getAllRoomsByBuildingId,
   getListRoom,
};
