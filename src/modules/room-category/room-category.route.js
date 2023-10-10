import { Router } from "express";
import { UserRole } from "../../constant.js";
import validate from "../../middlewares/validate.js";
import * as roomCategoryController from "./room-category.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import { checkUserRole } from "../../middlewares/authorize.js";
import * as roomCategoryValidator from "./room-category.validator.js";

const router = Router();

router.get(
   "/:roomCategoryId",
   auth,
   validate(roomCategoryValidator.getRoomCategoryById),
   roomCategoryController.getRoomCategoryById
);
router.post(
   "/",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(roomCategoryValidator.createRoomCategory),
   roomCategoryController.createRoomCategory
);
router.get("/", auth, roomCategoryController.getListRoomCategory);
router.put(
   "/:roomCategoryId",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(roomCategoryValidator.updateRoomCategoryById),
   roomCategoryController.updateRoomCategoryById
);
router.delete(
   "/:roomCategoryId",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(roomCategoryValidator.deleteRoomCategoryById),
   roomCategoryController.deleteRoomCategoryById
);
export default router;
