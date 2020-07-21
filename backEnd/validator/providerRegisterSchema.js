const joi = require('joi');

const providerRegisterSchema = joi.object().keys({
    fullName: joi.string().required().exist().min(3),
    password: joi.string().exist().required().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
    email: joi.string().exist().required().email(),
    mobileNumber: joi.string().exist().required(),
    country: joi.string().exist().required(),
    OrganizationName: joi.string().required().exist(),
    OrganizationAddress: joi.string().required().exist(),
    OrganizationRegNumber: joi.string().required().exist(),
    idType: joi.string().required().exist(),
    servicesOffered: joi.array().required().exist(),
    providerIdentityImg: joi.string(),//.required().exist(),
    partnerType: joi.array().required().exist(),
    role: joi.number().optional().valid(2)
})

module.exports = providerRegisterSchema;