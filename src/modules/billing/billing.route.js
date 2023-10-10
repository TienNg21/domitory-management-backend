import { Router } from "express"
import { checkUserRole } from "../../middlewares/authorize.js"
import { UserRole } from "../../constant.js"
import validate from "../../middlewares/validate.js"
import { auth } from "../../middlewares/authenticate.js"
import billingController from './billing.controller.js'
import billingValidator from './billing.validator.js'
const router = Router();

router.get("/",
    auth,
    checkUserRole([UserRole.ADMIN, UserRole.STUDENT]),
    billingController.getBillingList
)

router.patch("/:id",
    auth,
    checkUserRole([UserRole.ADMIN]),
    validate(billingValidator.updateBilling),
    billingController.updateBilling
)

router.delete("/:id",
    auth,
    checkUserRole([UserRole.ADMIN]),
    validate(billingValidator.deleteBilling),
    billingController.deleteBilling
)

export default router