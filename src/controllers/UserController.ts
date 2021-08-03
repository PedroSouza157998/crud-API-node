import { Request, Response } from 'express';
import { Op } from 'sequelize';
import database from '../database/connect';
import users from '../models/Users';

interface PersoneModel {
    name: string,
    password: string,
  }

  export default {

    async create(req: Request, res: Response) {
        const data: PersoneModel = req.body
        await database.sync()
        
        const query  = await users.build({
            name: data.name,
            password: data.password
        })
        await query.save()
        
        res.send(data)
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

        const query = await users.findOne({where: { [Op.and]: [{name: data.name}, {password: data.password}] } })
        res.json(query)
    },
}