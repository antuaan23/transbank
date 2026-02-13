import { Module } from '@nestjs/common';
import { WebpayService } from './webpay.service';
import { WebpayController } from './webpay.controller';
import { webpayPlusProvider } from './webpay.provider';

@Module({
  controllers: [WebpayController],
  providers: [WebpayService, webpayPlusProvider],
  exports: [WebpayService, webpayPlusProvider],
})
export class WebpayModule { }
