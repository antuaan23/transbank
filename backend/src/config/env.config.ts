import * as Joi from 'joi';

export interface ConfiguracionEnv {
    nodeEnv: string;
    puerto: number;
    webpay: {
        codigoComercio: string;
        claveApi: string;
    };
}

export const esquemaValidacion = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    NEST_PORT: Joi.number().default(3000),
    WEBPAY_COMMERCE_CODE: Joi.string().required(),
    WEBPAY_API_KEY: Joi.string().required(),
});

export const obtenerConfiguracion = (): ConfiguracionEnv => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    puerto: parseInt(process.env.NEST_PORT || '3000', 10),
    webpay: {
        codigoComercio: process.env.WEBPAY_COMMERCE_CODE || '',
        claveApi: process.env.WEBPAY_API_KEY || '',
    },
});
