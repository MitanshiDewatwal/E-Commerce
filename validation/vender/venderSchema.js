const joi = require("joi")
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
const Schema = {
    registerVender: joi.object({
        venderName: joi.string().max(20).required(),
        venderEmail: joi.string().email().required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(3)
            .minOfLowercase(4)
            .minOfUppercase(5)
            .minOfNumeric(6)
            .noWhiteSpaces()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces'
            }),
        city: joi.string().required(),
        contact: joi.number().integer().min(100000000)
            .max(9999999999).message("Invalid mobile number").required(),
        address: joi.string().required(),
        address: joi.string().required(),
        aboutVender: joi.string().required()
    }).unknown(true),


    loginVender: joi.object({
        venderEmail: joi.string().email().required(),
        password: joi.string().required(),
    }).unknown(true),
}

module.exports = Schema