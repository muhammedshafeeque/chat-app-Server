var express=require('express')
var router= express.Router()
var chatController=require('../Controllers/chatController')
router.post('/access',chatController.chatAccess)
router.get('/fetch-chats',chatController.fetchChats)
module.exports=router