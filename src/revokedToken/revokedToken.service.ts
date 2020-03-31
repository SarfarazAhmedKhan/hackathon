import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
const jwt = require('jsonwebtoken')
require('dotenv/config');

@Injectable()
export class RevokedService {

    constructor() { }

    revokedToken = async (user) => {
        try {
            const genToken = jwt.sign({ UserId: user._id }, process.env.SECRET, {
                expiresIn: "4h"
            });
            const token = genToken
            return token
        }
        catch (e) {
            console.log("View errorss", e)
            throw e
        }
    }

    checkedToken = async (token) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            // const getUserToken = await this.userModel.findById(decoded.UserId).select('token')
            // return getUserToken.token
        }
        catch (e) {
            console.log("View errorss123123", e)
            throw e
        }
    }
}