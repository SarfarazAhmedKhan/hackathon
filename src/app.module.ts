import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapModule } from './scrap/scrap.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
    }),
    ScrapModule,
    MongooseModule.forRoot('mongodb+srv://sarfarazahmedkhan:Afriart@cluster0-je03p.mongodb.net/test?retryWrites=true&w=majority',
      { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: false })
    , MongooseModule.forFeature([]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET }, { path: 'user/verifyCode', method: RequestMethod.POST }, { path: 'reserves/tradeShare/:id', method: RequestMethod.POST }, { path: 'reserves/buyEquity/:id', method: RequestMethod.POST }, { path: 'user', method: RequestMethod.PUT });
  }
}