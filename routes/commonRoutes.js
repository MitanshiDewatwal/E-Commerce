const express = require ('express')
const router = express.Router()
const userRoutes = require ('./userRoutes')
const venderRoutes = require ('./venderRoutes')
const productRoutes = require ('./productRoutes')

router.use('/user',userRoutes)
router.use('/vender',venderRoutes)
router.use('/product',productRoutes)

module.exports=router;