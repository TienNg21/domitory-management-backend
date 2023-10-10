import Joi from 'joi';
const updateBilling = {
    body: Joi.object({
        priceRoom: Joi.number().positive().required(),
        priceInternet: Joi.number().positive().required(),
        priceElectric: Joi.number().positive().required(),
        priceWater: Joi.number().positive().required(),
        priceParking: Joi.number().positive(),
        isPaid: Joi.boolean().required(),
    }),
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}

const deleteBilling = {
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}
export default {
    updateBilling,
    deleteBilling
}