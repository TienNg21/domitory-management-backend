import moment from "moment";
import { ContractStatus } from "../../constant.js";
import contractService from "../contract/services/contract.service.js"
import billingService from "../billing/services/billing.service.js";

export const scanContractToCreateBilling = async () => {
    try {
        const inUseContractList = await contractService.getContractListByStatus(ContractStatus.INUSE);
        const bulkCreateBillingBody = []
        inUseContractList.items.forEach(contract => {
            bulkCreateBillingBody.push({
                studentId: contract.studentId,
                roomId: contract.roomId,
                priceRoom: contract.priceRoom,
                priceWater: contract.priceWater,
                priceInternet: contract.priceInternet,
                priceElectric: contract.priceElectric,
                priceParking: contract.priceParking,
                startDate: moment().subtract(1, 'month').toDate(),
                endDate: moment().toDate(),
            })
        })
        await billingService.bulkCreateBilling(bulkCreateBillingBody)
    } catch (error) {
        console.log(`Cron job billing ${error}`);
        throw error;
    }
}