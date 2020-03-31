import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './scrap.controller';
import { ScrapService } from './scrap.service';
import { UserSchema } from './scrap.model';
import { NodemailerService } from '../nodemailer/nodemailer.service'
import { RevokedService } from '../revokedToken/revokedToken.service'
import { NestCrawlerModule } from 'nest-crawler';
// const scrap = require('./pl-scrapper')

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), NestCrawlerModule],
  controllers: [UserController],
  providers: [ScrapService, NodemailerService, RevokedService],
})
export class ScrapModule { }