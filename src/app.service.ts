import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class AppService {
  constructor() { }

  async search(req) {
    try {
      // const Arts = await this.artModel.find({ title: { $regex: '.*' + req.query.term + '.*' } }).select(['title', '_id', 'category'])
      // console.log("view here", Arts)
      // const Auctions = await this.auctionModel.find({ title: { $regex: '.*' + req.query.term + '.*' } }).select(['title', '_id', 'category'])
      // console.log("view here", Auctions)
      // return Arts.concat(Auctions)
    } catch (e) {
      console.log("view error")
      throw e
    }
  }
}