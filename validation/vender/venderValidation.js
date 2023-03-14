const { default: common } = require("joi/lib/common")
const keys = require("joi/lib/types/keys")
const { join } = require("path")
const vender = require("./venderSchema")

module.exports = {
    registerVenderValidation: async (req, res, next) => {
        const value = await vender.registerVender.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    loginVendervalidation: async (req, res, next) => {
        console.log("ok")
        const value = await vender.loginVender.validate(req.body, { abortEarly: false })
        console.log(value)
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}
