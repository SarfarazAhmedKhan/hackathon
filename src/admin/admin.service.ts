import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Admin } from './admin.model'
const bcrypt = require('bcryptjs');

@Injectable()
export class AdminService {

    constructor(@InjectModel('Admin') private readonly adminModel: Model<Admin>) { }

    async login(req) {
        try {
            const getAdmin = await this.adminModel.findOne({ email: req.body.email })
            if (!bcrypt.compareSync(req.body.password, getAdmin.hash)) throw "Email or password not match";
            console.log("view admin here", getAdmin)
            return getAdmin
        } catch (e) {
            console.log("view erere", e)
            throw e
        }
    }
}