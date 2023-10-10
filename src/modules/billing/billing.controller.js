import { HttpStatus, UserRole } from "../../constant.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
import billingService from "./services/billing.service.js";
const getBillingList = async (req, res) => {
    try {
        if (req.user.role == UserRole.STUDENT) {
            const billingList = await billingService.getBillingListByStudentId(
                req.user.id
            );
            return res
                .status(HttpStatus.OK)
                .json(new SuccessResponse(billingList));
        } else {
            const billingList = await billingService.getBillingList();
            return res
                .status(HttpStatus.OK)
                .json(new SuccessResponse(billingList));
        }
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const updateBilling = async (req, res) => {
    try {
        const body = req.body;
        const billingId = req.params.id;
        const updatedBilling = await billingService.updateBillingById(billingId,
            body)
        return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(updatedBilling));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const deleteBilling = async (req, res) => {
    try {
        await billingService.deleteBilling(req.params.id);
        return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse({ id: req.params.id }));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

export default {
    getBillingList,
    updateBilling,
    deleteBilling
}