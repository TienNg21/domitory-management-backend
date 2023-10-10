import db from "../../../../models/index.cjs";
const RoomCategory = db.roomCategory;
const Room = db.room;
const getRoomCategoryById = async (id) => {
   try {
      return await RoomCategory.findOne({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

// tao room category
const createRoomCategory = async (createBody) => {
   try {
      return await RoomCategory.create({ ...createBody });
   } catch (error) {
      throw error;
   }
};

// tra ve tat ca room category
const getListRoomCategory = async () => {
   try {
      return await RoomCategory.findAll({});
   } catch (error) {
      throw error;
   }
};
const updateRoomCategoryById = async (roomCategoryId, updateBody) => {
   try {
      return await RoomCategory.update(
         { ...updateBody },
         {
            where: {
               id: roomCategoryId,
            },
         }
      );
   } catch (error) {
      throw error;
   }
};
const deleteRoomCategoryById = async (roomCategoryId) => {
   try {
      return await RoomCategory.destroy({
         where: { id: roomCategoryId },
      });
   } catch (error) {
      throw error;
   }
};
export {
   getRoomCategoryById,
   createRoomCategory,
   getListRoomCategory,
   updateRoomCategoryById,
   deleteRoomCategoryById,
};
