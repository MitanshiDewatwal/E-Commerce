const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);


const Schema = {
    addProduct: joi
    .object({
        productName: joi.string().min(5).messages({
            "string.min": "{#label} should contains at least {#limit} characters",
        })
        .required(),
        productRating: joi
        .number()
        .integer()
        .max(5)
        .message("Rating should be 1 to 5"),
    })
    .unknown(true),
};

module.exports = Schema;