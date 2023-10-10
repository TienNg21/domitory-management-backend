import { HttpStatus } from "../../constant.js";
import * as buildingService from "./services/building.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";

/**
 * Trả về tòa nhà theo id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: thông tin tòa nhà
 */
const getBuildingById = async (req, res, next) => {
   try {
      const building = await buildingService.getBuildingById(
         req.params.buildingId
      );
      if (building) {
         res.status(HttpStatus.OK).send(new SuccessResponse(building));
      } else {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(
               HttpStatus.BAD_REQUEST,
               "Not found building by id"
            )
         );
      }
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

/**
 * Tạo mới 1 tòa nhà
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id của tòa nhà vừa tạo
 */
const createBuilding = async (req, res) => {
   try {
      const newBuilding = await buildingService.createBuilding(req.body);
      res.status(HttpStatus.OK).send(new SuccessResponse(newBuilding.id));
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

/**
 * Cập nhật thông tin 1 toàn nhà
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id tòa nhà
 */
const updateBuilding = async (req, res, next) => {
   try {
      const updateRow = await buildingService.updateBuildingById(
         req.params.buildingId,
         req.body
      );
      if (updateRow) {
         res.status(HttpStatus.OK).send(
            new SuccessResponse(req.params.buildingId)
         );
      } else {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(
               HttpStatus.BAD_REQUEST,
               "Not found building to update"
            )
         );
      }
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

/**
 * xóa thông tin 1 tòa nhà
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id tòa nhà
 */
const softDeleteBuildingById = async (req, res, next) => {
   try {
      let rowAffected = await buildingService.softDeleteBuildingById(
         req.params.buildingId
      );
      if (rowAffected > 0) {
         res.status(HttpStatus.OK).send(new SuccessResponse(req.params.id));
      } else {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(
               HttpStatus.BAD_REQUEST,
               "Not found building to soft delete"
            )
         );
      }
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};
const getBuildingList = async (req, res, next) => {
   try {
      const buildingList = await buildingService.getBuildingList(req.query);
      return res.status(HttpStatus.OK).json(new SuccessResponse(buildingList));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

export {
   getBuildingById,
   createBuilding,
   updateBuilding,
   softDeleteBuildingById,
   getBuildingList,
};
