var express=require('express')
const router=express.Router()
const messageController=require('../Controllers/messageController')
router.post('/send',messageController.sendMessage)
router.get('/fetch-messages/:chatId',messageController.getlAllmessages)
module.exports=router   