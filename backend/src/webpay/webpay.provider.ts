import { ConfigService } from '@nestjs/config';
import { Options, Environment, WebpayPlus } from 'transbank-sdk';
import { ConfiguracionEnv } from '../config/env.config';

export const WEBPAY_PLUS_TRANSACTION = 'WEBPAY_PLUS_TRANSACTION';

export const webpayPlusProvider = {
    provide: WEBPAY_PLUS_TRANSACTION,
    useFactory: (configService: ConfigService<ConfiguracionEnv>) => {
        const config = configService.get('webpay', { infer: true });

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

        return new WebpayPlus.Transaction(opciones);
    },
    inject: [ConfigService],
};
