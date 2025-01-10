import { JWT_SECRET } from "./configuration.js";
import jwt from "jsonwebtoken"
export const middleware=(req,res,next)=>{
    const authHeader = req.headers.authorization;   
     if(!authHeader){
       
        return res.status(403).json({})
    }
    if(!authHeader.startsWith('Bearer')
    ){
        
        return res.status(403).json({})

    }
    const token=authHeader.split(" ")[1];
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.userId=data.userId;
        next();

    }
    catch(err){
        res.status(403).json({})
    }

}