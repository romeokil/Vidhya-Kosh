import jwt from 'jsonwebtoken';

const verifyToken=async(req,res,next)=>{
    let {token}=req.cookie;
    if(!token){
        return res.status(401).json({
            "message":"Sorry You need to Login First!!"
        })
    }
    else{
        try{
            let decoded=jwt.verify(token,process.env.JWT_SECRET);
            if(!decoded){
                return res.status(201).json({
                    "message":"Sorry Unauthenticated User!!"
                })
            }
            req.id=decoded.id;
            console.log("Verify token middleware Passed!!")
            next();
        }
        catch(error){
            console.log("Error while decoding the token",error);
        }
    }
}

export default verifyToken;