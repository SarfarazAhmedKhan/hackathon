import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv/config');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() { }
  async use(req: Request, res: Response, next: Function) {
    try {
      console.log('Request... logger sir jee', req.headers['authorization']);
      const header = req.headers['authorization'];
      if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        console.log("view token hererere", token)
        let decode = jwt.verify(token, process.env.SECRET)
        console.log("view decoded", decode)
        req.body.decodeToken = decode
        console.log("view here", req.body)
      }
      next()
    }
    catch (e) {
      console.log("view err", e)
      res.status(403).send({
        responseCode: 403,
        responseMessage: "Forbidden",
        result: e
      })
    }
  }
}