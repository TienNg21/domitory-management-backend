import cron from "node-cron"
import { scanContractToCreateBilling } from "./service.js"
const cronJob = async () => {
    try {
        console.log("Register cron job");
        const cronJobSchedule = process.env.CRONJOB_SCHEDULE
        const task = cron.schedule(cronJobSchedule, async () => {
            console.log('Start schedule');
            await scanContractToCreateBilling();
            console.log('End schedule');
        })
    } catch (error) {

    }
}

export default cronJob;