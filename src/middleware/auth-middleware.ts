import { Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        const  data = req
        
        if(!authHeader)
            return res.status(401).send({error: "No token provided"})
        
        const token = authHeader.split(' ')[1]
        const scheme = authHeader.split(' ')[0]

        if(scheme !== "Bearer")
            return res.status(401).send({error: "Token malformatted"})

        JWT.verify(token, 'adadalconex', (err, decoded: any) => {
            if(err) return res.status(401).send({error: "Token invalid"})
            
            req.id = decoded.userId;
            return next() 
        })
        
    }catch(err){
        res.send("ERRO !!!!!")
    }
    
}