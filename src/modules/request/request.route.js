import { Router } from "express";
import { checkUserRole } from "../../middlewares/authorize.js";
import { UserRole } from "../../constant.js";
import requestController from "./request.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import validate from "../../middlewares/validate.js";
import requestValidator from "./request.validator.js";

const router = Router();

router.post("/",
    auth,
    checkUserRole([UserRole.STUDENT]),
    validate(requestValidator.createRequest),
    requestController.createRequest
);
// For both admin and student
router.get("/",
    auth,
    checkUserRole([UserRole.STUDENT, UserRole.ADMIN]),
    requestController.getRequestList
)

router.patch("/:id",
    auth,
    checkUserRole([UserRole.STUDENT]),
    validate(requestValidator.studentUpdateRequest),
    requestController.studentUpdateRequest
)
router.delete("/:id",
    auth,
    checkUserRole([UserRole.STUDENT]),
    validate(requestValidator.deleteRequest),
    requestController.deleteRequest
)

// For admin
router.patch("/:id/status",
    auth,
    checkUserRole(UserRole.ADMIN),
    validate(requestValidator.updateRequestStatus),
    requestController.updateRequestStatus
)

export default router;