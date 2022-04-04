const jwt =require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const collection=require('../Config/collections')
const db=require('../Config/connection')
module.exports={
    generateToken:(id)=>{
        return jwt.sign({id},process.env.JWT_TOCKEN_SECRET,{expiresIn:'30d'})
    },
    protect:async(req,res,next)=>{
        
        let token
        if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
            try {
                token=req.headers.authorization.split(" ")[1]
                const decoded=jwt.verify(token,process.env.JWT_TOCKEN_SECRET)
                req.user=await db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(decoded.id)})
                req.user._id=decoded.id
                next()
                
                
            } catch (error) {
                res.send({error:"Not authorized, token failed"})
            }
        }else{
            res.send({error:"Not authorized, no token"})
        }
    }

}