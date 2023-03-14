const express = require ('express')
const router = express.Router()
const product = require ('../controllers/productController.js')
const {upload}= require('../middlewares/imageStorage')
const validation = require ('../validation/product/productValidation')


router.post("/productAdd/:id",upload.single("productImage"),validation.addProductValidation,product.addProduct)
router.get("/productList",product.productList)
router.get("/productdetail/:id",product.productDetails)
router.delete("/delete/:id",product.productDelete)
router.patch("/edit/:id",product.editProduct)


module.exports = router;