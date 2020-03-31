import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

@Injectable()
export class ScrapService {

    constructor() { }

    //scrap
    async scrap(req) {
        try {
            const { url } = req.query
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
            console.log("check about", html)
            content.rating = $('.rc-ReviewsOverview__totals__rating').text();
            content.instructor = $('.instructor-name').text();
            const syllabus = $('.SyllabusModule')
            syllabus.each(function () {
                const text = $(this).find('.content').text();
                const title = $(this).find('.headline-2-text').text();
                content.syllabus.push({
                    text,
                    title
                });
            });
            console.log('syllabus length', content)
            return content
        }
        catch (e) {
            console.log("view error", e)
            throw e;
        }
    }
}