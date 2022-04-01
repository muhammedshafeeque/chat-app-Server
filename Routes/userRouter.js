
const express= require('express')
const rourer=express.Router()
const authController=require('../Controllers/AuthController')
rourer.post('/signup',authController.doSignup)
rourer.post('/login',authController.doLogin)
module.exports=rourer