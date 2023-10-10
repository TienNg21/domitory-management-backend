import {
   ContractStatus,
   HttpStatus,
   RequestStatus,
   RequestType,
   UserRole,
} from "../../constant.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
import requestService from "./services/request.service.js";
import * as roomService from "../room/services/room.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import userService from "../user/services/user.service.js";
import contractService from "../contract/services/contract.service.js";
import * as roomCategoryService from "../room-category/services/room-category.service.js";
const createRequest = async (req, res) => {
   try {
      if (req.user.roomId && req.body.type === RequestType.ROOM) {
         return res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "roomId",
               message: "Student already have room",
            })
         );
      }
      const isRoomExisted = await roomService.getRoomById(req.body.roomId);
      if (!isRoomExisted) {
         return res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "roomId",
               message: "Room not exist",
            })
         );
      }
      // đếm số lượng request pending và số user đã được vào trong phòng
      // nếu lớn hơn hoặc bằng capacity thì không cho đăng ký nữa
      let numbersRequest = await requestService.getListRequestPendingByRoomId(
         req.body.roomId
      );
      let userInRoomId = await userService.getUserByRoomId(
         req.body.roomId
      );
      const room = await roomService.getRoomById(req.body.roomId);
      let capacityRoom =
         room?.RoomCategory
            ?.capacity || 0;

      if (capacityRoom <= userInRoomId.length + numbersRequest) {
         return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
               new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "full slot")
            );
      }

      const newRequest = await requestService.insertRequest({
         ...req.body,
         studentId: req.user.id,
         status: RequestStatus.PENDING,
      });
      return res.status(HttpStatus.OK).json(new SuccessResponse(newRequest));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const getRequestList = async (req, res) => {
   try {
      if (req.user.role == UserRole.STUDENT) {
         const requestList = await requestService.getRequestListByStudentId(
            req.user.id
         );
         return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(requestList));
      } else {
         const requestList = await requestService.getAllRequestList();
         return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(requestList));
      }
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const studentUpdateRequest = async (req, res) => {
   try {
      const isRequestExisted = await requestService.getRequestById(
         req.params.id
      );
      if (!isRequestExisted || isRequestExisted.studentId !== req.user.id) {
         return res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "id",
               message: "Request not exist",
            })
         );
      }
      if (isRequestExisted.status !== RequestStatus.PENDING) {
         return res.status(HttpStatus.FORBIDDEN).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "roomId",
               message: "Cannot update after reject or accept",
            })
         );
      }
      const isRoomExisted = await roomService.getRoomById(req.body.roomId);
      if (!isRoomExisted) {
         return res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "roomId",
               message: "Room not exist",
            })
         );
      }
      const updatedRequest = await requestService.updateRequestById(
         req.params.id,
         req.body
      );
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse(updatedRequest));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const updateRequestStatus = async (req, res) => {
   try {
      const isRequestExisted = await requestService.getRequestById(
         req.params.id
      );
      if (!isRequestExisted) {
         return res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "id",
               message: "Request not exist",
            })
         );
      }
      if (isRequestExisted.status !== RequestStatus.PENDING) {
         return res.status(HttpStatus.FORBIDDEN).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "status",
               message: "Cannot change status after reject or accept",
            })
         );
      }
      const updatedRequest = await requestService.updateRequestById(
         req.params.id,
         req.body
      );
      if (req.body.status === RequestStatus.ACCEPTED) {
         const room = await roomService.getRoomById(isRequestExisted.roomId);
         const roomCategory = await roomCategoryService.getRoomCategoryById(
            room.roomCategoryId
         );
         const newContract = await contractService.insertContract({
            studentId: isRequestExisted.studentId,
            roomId: isRequestExisted.roomId,
            priceRoom: roomCategory.priceRoom,
            priceInternet: 0,
            priceWater: 0,
            priceElectric: 0,
            isPaid: false,
            startDate: new Date(),
            endDate: new Date(),
            status: ContractStatus.PENDING,
         });
      }
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse(updatedRequest));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const deleteRequest = async (req, res) => {
   try {
      const isRequestExisted = await requestService.getRequestById(
         req.params.id
      );
      if (!isRequestExisted) {
         return res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "id",
               message: "Request not exist",
            })
         );
      }
      if (isRequestExisted.status !== RequestStatus.PENDING) {
         return res.status(HttpStatus.FORBIDDEN).json(
            new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, {
               key: "id",
               message: "Cannot delete request after reject or accept",
            })
         );
      }
      await requestService.softDeleteRequestById(req.params.id);
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse({ id: req.params.id }));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

export default {
   createRequest,
   getRequestList,
   updateRequestStatus,
   studentUpdateRequest,
   deleteRequest,
};
