import { UserRole } from "../../constant.js";
import { Router } from "express";
import * as complainController from "./complain.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import { checkUserRole } from "../../middlewares/authorize.js";
import * as complainValidator from "./complain.validator.js";
import validate from "../../middlewares/validate.js";

const router = Router();
router.post(
   "/",
   auth,
   validate(complainValidator.createComplain),
   complainController.createComplain
);
router.get("/student", auth, complainController.getComplainByStudentId);
router.get("/:id", auth, complainController.getComplainById);
router.get(
   "/",
   auth,
   checkUserRole([UserRole.ADMIN]),
   //validate(complainValidator.getComplainList),
   complainController.getComplainList
);
router.put(
   "/:id",
   auth,
   checkUserRole([UserRole.ADMIN]),
   validate(complainValidator.updateComplain),
   complainController.updateComplain
);
router.delete("/:id", auth, complainController.deleteComplain);
export default router;
