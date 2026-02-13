import { Inject, Injectable } from '@nestjs/common';
import { WebpayPlus } from 'transbank-sdk';
import { CrearTransaccionDto } from './dto/crear-transaccion.dto';
import { WEBPAY_PLUS_TRANSACTION } from './webpay.provider';

@Injectable()
export class WebpayService {
  constructor(
    @Inject(WEBPAY_PLUS_TRANSACTION)
    private readonly transaccion: InstanceType<typeof WebpayPlus.Transaction>,
  ) { }

  async crearTransaccion(dto: CrearTransaccionDto) {
    const { buyOrder, sessionId, amount, returnUrl } = dto;
    return await this.transaccion.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl,
    );
  }

  async confirmarTransaccion(token: string) {
    return await this.transaccion.commit(token);
  }
}
