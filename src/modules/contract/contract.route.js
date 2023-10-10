import { Router } from "express"
import { checkUserRole } from "../../middlewares/authorize.js"
import { UserRole } from "../../constant.js"
import validate from "../../middlewares/validate.js"
import contractValidator from "./contract.validator.js"
import { auth } from "../../middlewares/authenticate.js"
import contractController from "./contract.controller.js"
const router = Router()
router.get("/",
    auth,
    checkUserRole([UserRole.ADMIN, UserRole.STUDENT]),
    contractController.getContractList,
)
router.patch("/:id",
    auth,
    checkUserRole([UserRole.ADMIN]),
    validate(contractValidator.updateContract),
    contractController.updateContract,
)
router.patch("/:id/status",
    auth,
    checkUserRole([UserRole.ADMIN]),
    validate(contractValidator.updateContractStatus),
    contractController.updateContractStatus,
)
router.delete("/:id",
    auth,
    checkUserRole([UserRole.ADMIN]),
    validate(contractValidator.deleteContract),
    contractController.deleteContract
)

export default router