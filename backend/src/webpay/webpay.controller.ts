import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WebpayService } from './webpay.service';
import { CrearTransaccionDto } from './dto/crear-transaccion.dto';

@ApiTags('webpay')
@Controller('webpay')
export class WebpayController {
  constructor(private readonly webpayService: WebpayService) { }

  @Post('crear-transaccion')
  @ApiOperation({ summary: 'Crear una transacción Webpay' })
  @ApiResponse({ status: 201, description: 'Transacción creada exitosamente.' })
  async crear(@Body() dto: CrearTransaccionDto): Promise<any> {
    const respuesta = await this.webpayService.crearTransaccion(dto);
    return {
      ...respuesta,
      urlFinal: `${respuesta.url}?token_ws=${respuesta.token}`
    };
  }

  @Get('retorno')
  @ApiOperation({ summary: 'Recibir retorno de Webpay y confirmar transacción' })
  @ApiResponse({ status: 200, description: 'Transacción procesada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Token no proporcionado.' })
  @ApiResponse({ status: 500, description: 'Error al procesar la transacción.' })
  async manejarRetorno(@Query('token_ws') token: string): Promise<any> {
    if (!token) {
      return {
        exitoso: false,
        mensaje: 'Token no proporcionado',
        error: 'TOKEN_FALTANTE'
      };
    }

    try {
      const resultado = await this.webpayService.confirmarTransaccion(token);
      return {
        exitoso: true,
        mensaje: 'Transacción confirmada exitosamente',
        datos: resultado
      };
    } catch (error) {
      console.error('Error confirmando transacción:', error);
      return {
        exitoso: false,
        mensaje: 'Error al confirmar la transacción',
        error: error.message || 'ERROR_TRANSACCION'
      };
    }
  }
}
