import { Router } from "express";
import { UserRole } from "../../constant.js";
import validate from "../../middlewares/validate.js";
import * as buildingController from "./building.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import { checkUserRole } from "../../middlewares/authorize.js";
import * as buildingValidator from "./building.validator.js";
const router = Router();

router.get(
   "/:buildingId",
   auth,
   validate(buildingValidator.getById),
   buildingController.getBuildingById
);
router.post(
   "/",
   auth,
   //checkUserRole(UserRole.ADMIN),
   validate(buildingValidator.create),
   buildingController.createBuilding
);
router.get("/", auth, buildingController.getBuildingList);
router.put(
   "/:buildingId",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(buildingValidator.update),
   buildingController.updateBuilding
);
router.delete(
   "/:buildingId",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(buildingValidator.softDeleteById),
   buildingController.softDeleteBuildingById
);
export default router;
