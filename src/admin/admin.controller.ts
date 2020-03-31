import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('/')
    async login(@Req() req: Request, @Res() res: Response) {
        try {
            console.log("view here admin request sir jee", req.body)
            const result = await this.adminService.login(req);
            console.log("view result here", result)
            res.status(200).send(
                {
                    responseCode: 200,
                    responseMessage: "Success",
                    result: result
                }
            )
        } catch (error) {
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