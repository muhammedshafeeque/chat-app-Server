
const express= require('express')
const rourer=express.Router()
const userContoller=require('../Controllers/userContoller')
const { protect } = require('../Functions/webToken')
rourer.post('/signup',userContoller.doSignup)
rourer.post('/login',userContoller.doLogin)
rourer.get('/getusers/',protect,userContoller.findUsers)
module.exports=rourer