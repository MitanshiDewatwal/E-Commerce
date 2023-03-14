const express = require ('express')
const router = express.Router()
const user = require ('../controllers/userController.js')
const {upload}= require('../middlewares/imageStorage')
const auth = require ("../middlewares/authMiddlewares.js")
const validation = require ('../validation/user/userValidation')


router.post("/signUp",upload.single("profilePic"),validation.registerUserValidation,user.userSignUp)
router.post("/login",auth.isUser,validation.loginUservalidation,user.userLogin)
router.post("/resetPassword",user.resetPasswordThroughEmail)
router.post("/passwordReset/:id/:token",user.userPasswordReset)
module.exports = router;