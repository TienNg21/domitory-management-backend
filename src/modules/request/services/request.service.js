import db from "../../../../models/index.cjs";
import { RequestStatus } from "../../../constant.js";
const Request = db.request;

const getRequestById = async (id) => {
   try {
      return await Request.findOne({
         where: {
            id,
            deletedAt: null,
         },
         include: [
            {
               model: db.user,
               attributes: ["name", "studentCode"],
            },
            {
               model: db.room,
               attributes: ["name", "buildingId"],
               include: [
                  {
                     model: db.building,
                     attributes: ["name", "address"],
                  },
               ],
            },
         ],
      });
   } catch (error) {
      throw error;
   }
};

const getRequestListByStudentId = async (studentId) => {
   try {
      const requestList = await Request.findAll({
         where: {
            studentId,
            deletedAt: null,
         },
         include: [
            {
               model: db.user,
               attributes: ["name", "studentCode"],
            },
            {
               model: db.room,
               attributes: ["name", "buildingId"],

               include: [
                  {
                     model: db.building,
                     attributes: ["name", "address"],
                  },
               ],
            },
         ],
      });
      const totalItems = await Request.count({
         where: {
            studentId,
            deletedAt: null,
         },
      });
      return { items: requestList, totalItems };
   } catch (error) {
      throw error;
   }
};

const getAllRequestList = async () => {
   try {
      const data = await Request.findAndCountAll({
         include: [
            {
               model: db.user,
               attributes: ["name", "studentCode"],
            },
            {
               model: db.room,
               attributes: ["name", "buildingId"],
               include: [
                  {
                     model: db.building,
                     attributes: ["name", "address"],
                  },
               ],
            },
         ],
      });
      return { items: data.rows, totalItems: data.count };
   } catch (error) {
      throw error;
   }
};

const insertRequest = async (body) => {
   try {
      const newRequest = await Request.create(body);
      return newRequest;
   } catch (error) {
      throw error;
   }
};

const updateRequestById = async (id, body) => {
   try {
      await Request.update(
         { ...body, updatedAt: new Date() },
         {
            where: {
               id,
               deletedAt: null,
            },
         }
      );
      return await getRequestById(id);
   } catch (error) {
      throw error;
   }
};

const softDeleteRequestById = async (id) => {
   try {
      return await Request.destroy({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

const getListRequestPendingByRoomId = async (roomId) => {
   try {
      const data = await Request.findAndCountAll({
         where: {
            roomId: roomId,
            status: RequestStatus.PENDING,
         },
      });

      return data.count;
   } catch (error) {
      throw error;
   }
};
export default {
   insertRequest,
   getRequestListByStudentId,
   getAllRequestList,
   getRequestById,
   updateRequestById,
   softDeleteRequestById,
   getListRequestPendingByRoomId,
};
