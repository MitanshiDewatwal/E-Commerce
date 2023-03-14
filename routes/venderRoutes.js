const express = require ('express')
const router = express.Router()
const vender = require ('../controllers/venderController')
const {upload}= require('../middlewares/imageStorage')
const auth = require ("../middlewares/authMiddlewares.js")
const validation = require ('../validation/vender/venderValidation')



router.post("/signUp",upload.single("venderProfilePic"),validation.registerVenderValidation,vender.venderSignUp)
router.post("/login",auth.isVender,validation.loginVendervalidation,vender.venderLogin)
router.post("/resetPassword",vender.resetPasswordThroughEmail)
router.post("/passwordReset/:id/:token",vender.userPasswordReset)

module.exports = router;