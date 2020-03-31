import { Injectable, NotFoundException } from '@nestjs/common';

const nodemailer = require('nodemailer');

//nodemailer configuration

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
        user: 'africanart.international@gmail.com',
        pass: "jdekneiidndwnmnk"
    },
    tls: {
        rejectUnauthorized: false
    }
});

@Injectable()
export class NodemailerService {

    constructor() { }

    //function to send invoice mail to payer
    sendInvoiceToPayerEmail = async (invoiceData) => {
        try {
            const code = Math.floor(Math.random() * 1000000);
            let info = await transporter.sendMail({
                from: '', // sender address
                to: "" + `${invoiceData.email}`,//receiver email
                subject: 'AfricanArt.International Verification Code', // Subject line
                html: `
                <br/>
                <p>Dear ${invoiceData.name},</p>
                <p><span>Your Verification Code is: <b> ${code} <b/><span/></p>`
            })
            const mail = {
                info: info,

            };
            return  code;
        }
        catch (e) {
            console.log("catching error in mail==>", e.message);
            throw [404, "Email not send"];
        }
    }

    mailToCustomMail = async (invoiceData) => {
        try {
            const resultFromPayer = await this.sendInvoiceToPayerEmail(invoiceData);
            return resultFromPayer;
        }
        catch (e) {
            throw [404, "Email not Send"];
        }
    }
}