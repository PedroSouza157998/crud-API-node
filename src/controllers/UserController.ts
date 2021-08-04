import { Request, Response } from 'express';
import { Op } from 'sequelize';
import {generateToken} from '../utils/verifyJWT'
import database from '../database/connect';
import users from '../models/Users';
interface PersoneModel {
    name: string,
    password: string,
}
interface Query {
    id: number,
    name: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

  export default {

    async create(req: Request, res: Response) {
        const data: PersoneModel = req.body
        await database.sync()
        
        const query: Query | any  = await users.build({
            name: data.name,
            password: data.password
        })
        await query.save()
        const accressToken = await generateToken({
            access_token: true,
            userName: query.name,
            expo: Math.floor(Date.now() / 1000) + 3600
        })
        
        res.json({query, accressToken})
    },


    async index(req: Request, res: Response){
        await database.sync()
        const AllUsers = await users.findAll()
        res.json(AllUsers)
    },


    async delete(req: Request, res: Response){
        const data = req.body
        await database.sync()
        const AllUsers = await users.destroy({where: {id: data.id}})
        res.json(AllUsers)
    },


    async login(req: Request, res: Response){
        const data: PersoneModel = req.body
        await database.sync()        

        const query: Query | any = await users.findOne({where: { [Op.and]: [{name: data.name}, {password: data.password}] } })
        
        const accressToken = await generateToken({
            access_token: true,
            userId: query.name,
            expo: Math.floor(Date.now() / 1000) + 3600
        })

        const refreshToken = await generateToken({
            refresh: true,
            userId: query.name,
            expo: Math.floor(Date.now() / 1000) + 7200
        })

        if(!accressToken){
            res.send("Cadastro invalido")
        }
        res.json({query, accressToken})
    },
}