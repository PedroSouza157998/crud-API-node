import { Request, Response, NextFunction } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers['authorization']?.toString().replace('Bearer ', ''). trim();
        // const decoded = await JW
    }catch(err){
        res.send("ERRO !!!!!")
    }
    
}