import db from "../../../../models/index.cjs";
const Contract = db.contract;

const getContractById = async (id) => {
   try {
      return await Contract.findOne({
         where: { id },
         include: [
            {
               model: db.user,
            },
            {
               model: db.room,
               attributes: ["name", "buildingId", "roomCategoryId"],
               include: [
                  {
                     model: db.building,
                     attributes: ["name", "address"],
                  },
                  {
                     model: db.roomCategory,
                     attributes: [
                        "name",
                        "description",
                        "capacity",
                        "priceRoom",
                     ],
                  },
               ],
            },
         ],
      });
   } catch (error) {
      throw error;
   }
};

const getContractListByStatus = async (status) => {
   try {
      const data = await Contract.findAndCountAll({
         where: {
            status,
         },
         include: [
            {
               model: db.user,
            },
            {
               model: db.room,
               attributes: ["name", "buildingId", "roomCategoryId"],
               include: [
                  {
                     model: db.building,
                     attributes: ["name", "address"],
                  },
                  {
                     model: db.roomCategory,
                     attributes: [
                        "name",
                        "description",
                        "capacity",
                        "priceRoom",
                     ],
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

const insertContract = async (insertContractBody) => {
   try {
      const newContract = await Contract.create(insertContractBody);
      return newContract;
   } catch (error) {
      throw error;
   }
};

const updateContractById = async (id, updateBody) => {
   try {
      await Contract.update(updateBody, {
         where: {
            id,
         },
      });
      return await getContractById(id);
   } catch (error) {
      throw error;
   }
};

const getContractListByStudentId = async (studentId) => {
   try {
      const data = await Contract.findAndCountAll({
         where: {
            studentId,
         },
         include: [
            {
               model: db.user,
            },
            {
               model: db.room,
               attributes: ["name", "buildingId", "roomCategoryId"],
               include: [
                  {
                     model: db.building,
                     attributes: ["name", "address"],
                  },
                  {
                     model: db.roomCategory,
                     attributes: [
                        "name",
                        "description",
                        "capacity",
                        "priceRoom",
                     ],
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

const getContractList = async () => {
   try {
      const data = await Contract.findAndCountAll({
         include: [
            {
               model: db.user,
            },
            {
               model: db.room,
               attributes: ["name", "buildingId", "roomCategoryId"],
               include: [
                  {
                     model: db.building,
                     attributes: ["name", "address"],
                  },
                  {
                     model: db.roomCategory,
                     attributes: [
                        "name",
                        "description",
                        "capacity",
                        "priceRoom",
                     ],
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

const deleteContractById = async (id) => {
   try {
      return await Contract.destroy({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

export default {
   getContractById,
   insertContract,
   updateContractById,
   getContractList,
   deleteContractById,
   getContractListByStudentId,
   getContractListByStatus,
};
