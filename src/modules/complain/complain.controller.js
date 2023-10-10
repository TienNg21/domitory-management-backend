import { HttpStatus } from "../../constant.js";
import * as complainService from "./services/complain.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
import { UserRole, RequestStatus } from "../../constant.js";
const createComplain = async (req, res, next) => {
   try {
      let complainId = await complainService.createComplain({
         studentId: req.user.id,
         ...req.body,
         status: RequestStatus.PENDING,
      });
      if (complainId)
         return res.status(HttpStatus.OK).json(new SuccessResponse(complainId));
      else
         return res
            .status(HttpStatus.BAD_REQUEST)
            .json(
               new ErrorResponse(
                  HttpStatus.BAD_REQUEST,
                  "Some error !!! Try again..."
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

const getComplainById = async (req, res, next) => {
   try {
      let complain = await complainService.getComplainById(req.params.id);
      // nếu có complain
      if (complain) {
         // check role
         // admin thì xem được hoặc user.id trùng với studentId của complain
         if (
            req?.user?.role === UserRole.ADMIN ||
            req?.user?.id === complain?.studentId
         ) {
            return res
               .status(HttpStatus.OK)
               .json(new SuccessResponse(complain));
         }
         return res
            .status(HttpStatus.UNAUTHORIZED)
            .json(new ErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized"));
      }
      return res
         .status(HttpStatus.ITEM_NOT_FOUND)
         .json(new ErrorResponse(HttpStatus.ITEM_NOT_FOUND, "Not found"));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const getComplainByStudentId = async (req, res, next) => {
   try {
      let complains =
         (await complainService.getComplainByStudentId(req.user.id)) || [];
      return res.status(HttpStatus.OK).json(new SuccessResponse(complains));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const getComplainList = async (req, res, next) => {
   try {
      let complainList = await complainService.getComplainList(req.query);
      return res.status(HttpStatus.OK).json(new SuccessResponse(complainList));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const updateComplain = async (req, res, next) => {
   try {
      let rowAffected = await complainService.updateComplain(
         req.params.id,
         req.body
      );
      if (rowAffected > 0) {
         const updatedComplain = await complainService.getComplainById(
            req.params.id
         );
         return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(updatedComplain));
      }
      return res
         .status(HttpStatus.BAD_REQUEST)
         .json(
            new ErrorResponse(HttpStatus.BAD_REQUEST, "update complain failed")
         );
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const deleteComplain = async (req, res, next) => {
   try {
      let complain = await complainService.getComplainById(req.params.id);
      // nếu có complain
      if (complain) {
         // check role
         // admin thì xem được hoặc user.id trùng với studentId của complain
         if (
            req?.user?.role === UserRole.ADMIN ||
            (req?.user?.id === complain?.studentId &&
               complain.status === RequestStatus.PENDING)
         ) {
            const rowAffected = await complainService.deleteComplain(
               req.params.id
            );
            if (rowAffected > 0) {
               return res
                  .status(HttpStatus.OK)
                  .json(new SuccessResponse(req.params.id));
            }
            return res
               .status(HttpStatus.BAD_REQUEST)
               .json(
                  new ErrorResponse(
                     HttpStatus.BAD_REQUEST,
                     "Delete complain failed"
                  )
               );
         }
         return res
            .status(HttpStatus.UNAUTHORIZED)
            .json(new ErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized"));
      }
      return res
         .status(HttpStatus.ITEM_NOT_FOUND)
         .json(new ErrorResponse(HttpStatus.ITEM_NOT_FOUND, "Not found"));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
export {
   createComplain,
   getComplainById,
   getComplainByStudentId,
   getComplainList,
   updateComplain,
   deleteComplain,
};
