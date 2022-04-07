
const express= require('express')
const router =express.Router()
const userContoller=require('../Controllers/userContoller')
const { protect } = require('../Functions/webToken')
router.post('/signup',userContoller.doSignup)
router.get('/check-username/:username',userContoller.checkUserId)
router.post('/login',userContoller.doLogin)
router.get('/getusers/',protect,userContoller.findUsers)
module.exports=router