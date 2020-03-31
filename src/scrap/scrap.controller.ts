import { Controller, Get, Post, Req, Res, Put } from '@nestjs/common';
import { ScrapService } from './scrap.service';
import { Request, Response } from 'express';

@Controller('scrap')
export class UserController {
    constructor(private readonly scrapService: ScrapService) { }

    @Get('/')
    async scrap(@Req() req: Request, @Res() res: Response) {
        try {
            console.log(req)
            let results = await this.scrapService.scrap(req);
            console.log("recive vontect", results)
            res.status(200).send({
                responseCode: 200,
                responseMessage: "Success",
                result: results
            })
        } catch (error) {
            return {
                responseCode: 400,
                responseMessage: error,
                result: error
            }
        }
    }
}