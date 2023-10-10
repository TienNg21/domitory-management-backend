import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
import { UserRole } from "../../../constant.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
const User = db.user;

const userAttribute = [
   "id",
   "name",
   "email",
   "role",
   "status",
   "createdAt",
   "updatedAt",
   "deletedAt",
];

const createUser = async (createUserBody) => {
   try {
      const newUser = await User.create(createUserBody);
      delete newUser.password;
      return newUser;
   } catch (error) {
      throw error;
   }
};

const getUserById = async (id) => {
   try {
      return await User.findOne({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

const getUserByEmail = async (email) => {
   try {
      return await User.findOne({
         where: {
            email,
         },
      });
   } catch (error) {
      throw error;
   }
};

const getUserList = async (query) => {
   try {
      // const {
      //    page = 1,
      //    limit = 10,
      //    keyword = "",
      //    role = [],
      //    status = ""
      // } = query
      // let dbQuery = {}
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
      //             email: {
      //                [Op.like]: `%${keyword}%`,
      //             },
      //          },
      //       ],
      //    }
      // }

      // if (role.length) {
      //    dbQuery = {
      //       ...dbQuery,
      //       role: {
      //          [Op.in]: role
      //       }
      //    }
      // }

      // if (status.length) {
      //    dbQuery = {
      //       ...dbQuery,
      //       status: {
      //          [Op.in]: status
      //       }
      //    }
      // }
      // const data = await User.findAndCountAll({
      //    limit: +limit || 1,
      //    offset: (+limit) * (+page - 1),
      //    order: [['createdAt', 'DESC']],
      //    attributes: { exclude: ['password'] },
      //    where: dbQuery
      // })
      // return { items: data.rows, totalItems: data.count }
      const data = await User.findAndCountAll({
         attributes: { exclude: ["password"] },
      });
      return { items: data.rows, totalItems: data.count };
   } catch (error) {
      throw error;
   }
};

const updateUserById = async (id, updateBody) => {
   try {
      return await User.update(updateBody, {
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

const softDeleteUserById = async (id) => {
   try {
      return await User.destroy({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

const getUserByRoomId = async (roomId) => {
   try {
      return await User.findAll({
         where: {
            roomId,
         },
      });
   } catch (error) {
      throw error;
   }
};
export default {
   createUser,
   getUserById,
   getUserByEmail,
   updateUserById,
   getUserList,
   softDeleteUserById,
   getUserByRoomId,
};
