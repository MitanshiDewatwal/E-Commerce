const { join } = require("path")
const { default: common } = require("joi/lib/common")

const product = require('./productSchema')


module.exports = {
    addProductValidation: async(req,res,next)=>{
        const value = await product.addProduct.validate(req.body,{ abortEarly: false })
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