import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './scrap.model'
import { RevokedService } from '../revokedToken/revokedToken.service'
import { NodemailerService } from '../nodemailer/nodemailer.service'
import { NestCrawlerService } from 'nest-crawler';
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
@Injectable()
export class ScrapService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly crawler: NestCrawlerService,
        private readonly revokedService: RevokedService, private readonly nodemailerService: NodemailerService) { }

    //scrap
    async scrap(req) {
        try {
            const { url } = req.query
            console.log("url",url)
            let content = {
                instructor: "",
                about: "",
                syllabus: [],
                rating: 0
            }
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            const html = await page.content()
            const $ = cheerio.load(html);
            content.about = $('.content').text()
            content.rating = $('.rc-ReviewsOverview__totals__rating').text();
            content.instructor = $('.instructor-name').text();
            const syllabus = $('.SyllabusModule')
            await syllabus.each(function () {
                // let list = []
                const text = $(this).find('.content').text();
                // let inner = $(this).find('.ItemGroupView')
                // inner.each(function () {
                //     let items = $(this).find('.items').text();
                //     console.log("view items here",items)
                //     list.push({
                //         items
                //     })
                // })
                const title = $(this).find('.headline-2-text').text();
                content.syllabus.push({
                    text,
                    title,
                    // inner
                });
            });
            browser.close();
            console.log('syllabus length', content)
            return content
        }
        catch (e) {
            console.log("view error", e)
            throw e;
        }
    }

    // getdata = async () => {
    //     try {
    //         let str = ''
    //         await https.get(url3, (res) => {
    //             // console.log('statusCode:', res.statusCode);
    //             // console.log('headers:', res.headers);
    //             res.on('data', (d) => {
    //                 // console.log("result ==>", d)
    //                 str += d;
    //                 // process.stdout.write(d);
    //             });
    //             res.on('end', function () {
    //                 // console.log("html==>", str);
    //                 const html = str
    //                 console.log(html)
    //                 const $ = cheerio.load(html);
    //                 const statsTable = $('.main-content');
    //                 console.log("section contasdas", statsTable.length);
    //                 return statsTable
    //             });
    //             // return str
    //         }).on('error', (e) => {
    //             console.error(e);
    //         })
    //     }
    //     catch (e) {
    //         console.log("error=>", e)
    //         return false
    //     }
    // }


    public async scrape(req): Promise<void> {
        interface ExampleCom {
            title: string;
            info: string;
            content: string;
        }

        const data: ExampleCom = await this.crawler.fetch({
            target: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
            fetch: {
                title: 'h1',
                info: {
                    selector: 'p > a',
                    attr: 'href',
                },
                content: {
                    selector: '.content',
                    how: 'html',
                },
            },
        });

        console.log(data);
        // {
        //   title: 'Example Domain',
        //   info: 'http://www.iana.org/domains/example',
        //   content: '<div><h1>Example Heading</h1><p>Example Paragraph</p></div>'
        // }
    }
}