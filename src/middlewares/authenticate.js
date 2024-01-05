const jwt = require('jsonwebtoken');
const authenticate = async(req,res,next) => {

    //extract token from request header
    console.log(req.headers.authorization);
    const token = req.headers.authorization || req.query.token;
    console.log(token);
    if(!token){
        
        return res.status(403).json({message: "Unauthorized: token missing"});
    }
    try{
        const decoded = jwt.verify(token,'secretKey');
        req.user = decoded;
        console.log(decoded,'working')
        next();
        }
    catch(err){
        console.log(err)
        return res.status(401).json({message:'unauthorized: Invalid token'});
    }

}

module.exports = authenticate;