const jwt = require('jsonwebtoken');
const JWT_SECRET = 'atrika@show';

const fetchuser = (req, res, next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
       return res.status(401).send({error : "please authenticate using a valid token"})
    }
    // else 
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
       return res.status(401).send({error : "please authenticate using a valid token"})
    }
    
}


module.exports = fetchuser;