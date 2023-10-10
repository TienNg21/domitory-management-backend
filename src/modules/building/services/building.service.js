import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
const Building = db.building;
const Room = db.room;
const buildingAttribute = [
   "id",
   "name",
   "address",
   "createdAt",
   "updatedAt",
   "deletedAt",
];

/**
 * Tạo mới tòa nhà
 * @param {*} createBuildingBody
 * @returns thông tin tòa nhà vừa tạo
 * Author: VDTIEN(23/11/2022)
 */
const createBuilding = async (createBuildingBody) => {
   try {
      const newBuilding = await Building.create({
         ...createBuildingBody,
      });
      return newBuilding;
   } catch (error) {
      throw error;
   }
};

/**
 * trả về thông tin tòa nhà theo id
 * @param {*} id
 * @returns thông tin tòa nhà
 */
const getBuildingById = async (id) => {
   try {
      return await Building.findOne({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

/**
 * Cập nhật thông tin tòa nhà
 * @param {*} updateBody
 * @returns thông tin tòa nhà được cập nhật
 */
const updateBuildingById = async (buildingId, updateBody) => {
   try {
      return await Building.update(
         { ...updateBody },
         {
            where: {
               id: buildingId,
            },
         }
      );
   } catch (error) {
      throw error;
   }
};

/**
 * xóa mềm 1 tòa nhà theo id
 * @param {*} id
 */
const softDeleteBuildingById = async (id) => {
   try {
      await Room.destroy({
         where: {
            buildingId: id,
         },
      });
      return await Building.destroy({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};
const getBuildingList = async (query) => {
   try {
      // const { page = 1, limit = 10, keyword = "" } = query;
      // let dbQuery = {};
      // if (keyword) {
      //    dbQuery = {
      //       ...dbQuery,
      //       [Op.or]: [
      //          {
      //             name: {
      //                [Op.like]: `%${keyword}%`,
      //             },
      //          },
      //          {
      //             address: {
      //                [Op.like]: `%${keyword}%`,
      //             },
      //          },
      //       ],
      //    };
      // }

      // const data = await Building.findAndCountAll({
      //    limit: +limit || 1,
      //    offset: +limit * (+page - 1),
      //    order: [["createdAt", "DESC"]],
      //    where: dbQuery,
      // });
      const data = await Building.findAndCountAll();
      return { items: data.rows, totalItems: data.count };
   } catch (error) {
      throw error;
   }
};

export {
   createBuilding,
   getBuildingById,
   updateBuildingById,
   softDeleteBuildingById,
   getBuildingList,
};
