import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
import { UserRole } from "../../../constant.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
const Complain = db.complain;

const createComplain = async (createBody) => {
   try {
      const complain = await Complain.create({
         ...createBody,
      });
      if (complain) return complain.id;
      else return null;
   } catch (error) {
      throw error;
   }
};
const getComplainById = async (id) => {
   try {
      return await Complain.findOne({
         where: { id: id },
         include: [
            {
               model: db.user,
               attributes: ["name", "studentCode"],
            },
         ],
      });
   } catch (error) {
      throw error;
   }
};
const getComplainByStudentId = async (studentId) => {
   try {
      return await Complain.findAll({
         where: { studentId: studentId },
         include: [
            {
               model: db.user,
               attributes: ["name", "studentCode"],
            },
         ],
      });
   } catch (error) {
      throw error;
   }
};
const getComplainList = async (query) => {
   try {
      // const {
      //    page = 1,
      //    limit = 10,
      //    type = "",
      //    level = "",
      //    status = "",
      // } = query;
      // let dbQuery = {};
      // if (type) {
      //    dbQuery = {
      //       ...dbQuery,
      //       type,
      //    };
      // }
      // if (level) {
      //    dbQuery = {
      //       ...dbQuery,
      //       level,
      //    };
      // }
      // if (status) {
      //    dbQuery = {
      //       ...dbQuery,
      //       status,
      //    };
      // }
      const data = await Complain.findAndCountAll({
         // limit: +limit || 1,
         // offset: +limit * (+page - 1),
         // order: [["createdAt", "DESC"]],
         // where: dbQuery,
         include: [
            {
               model: db.user,
               attributes: ["name", "studentCode"],
            },
         ],
      });
      return { items: data.rows, totalItems: data.count };
   } catch (error) {
      throw error;
   }
};
const updateComplain = async (id, updateBody) => {
   try {
      return await Complain.update(
         {
            ...updateBody,
         },
         {
            where: {
               id,
            },
         }
      );
   } catch (error) {
      throw error;
   }
};
const deleteComplain = async (id) => {
   try {
      return await Complain.destroy({ where: { id } });
   } catch (error) {
      throw error;
   }
};
export {
   createComplain,
   getComplainById,
   getComplainByStudentId,
   updateComplain,
   deleteComplain,
   getComplainList,
};
