import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Options, Environment, WebpayPlus } from 'transbank-sdk';
import { CrearTransaccionDto } from './dto/crear-transaccion.dto';
import { ConfiguracionEnv } from '../config/env.config';

@Injectable()
export class WebpayService {
  private readonly transaccion: InstanceType<typeof WebpayPlus.Transaction>;

  constructor(private configService: ConfigService<ConfiguracionEnv>) {
    const config = this.configService.get('webpay', { infer: true });

    if (!config?.codigoComercio || !config?.claveApi) {
      throw new Error(
        'Las variables de entorno de Webpay no están definidas en el .env',
      );
    }

    const opciones = new Options(
      config.codigoComercio,
      config.claveApi,
      Environment.Integration,
    );

    this.transaccion = new WebpayPlus.Transaction(opciones);
  }

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
