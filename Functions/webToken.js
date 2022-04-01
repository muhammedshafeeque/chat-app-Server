const jwt =require('jsonwebtoken')

module.exports={
    generateToken:(id)=>{
        return jwt.sign({id},process.env.JWT_TOCKEN_SECRET,{expiresIn:'30d'})
    }
}