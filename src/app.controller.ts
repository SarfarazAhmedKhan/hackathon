import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express'

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/search')
  async getSearch(@Req() req: Request, @Res() res: Response) {
    try {
      console.log("req", req.query)
      const result = await this.appService.search(req);
      console.log("check this out here search", result)
      res.status(200).send(
        {
          responseCode: 200,
          responseMessage: "Success",
          result: result
        }
      )
    }
    catch (error) {
      res.status(400).send(
        {
          responseCode: 400,
          responseMessage: error,
          result: error
        }
      )
    }
  }
}