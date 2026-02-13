# Backend Webpay - API REST para Transbank

API REST desarrollada con NestJS para integración con Webpay Plus de Transbank. Este backend proporciona endpoints para crear y confirmar transacciones de pago.

## 🚀 Características

- ✅ Integración completa con Webpay Plus (Transbank)
- ✅ API REST con documentación Swagger
- ✅ Validación de datos con class-validator
- ✅ Configuración mediante variables de entorno
- ✅ Soporte para Docker
- ✅ Código completamente en español

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Credenciales de Transbank (Commerce Code y API Key)

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo `.env.example` a `.env` y configura tus credenciales:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Transbank:

```env
NEST_PORT=3000
WEBPAY_COMMERCE_CODE=tu_codigo_comercio
WEBPAY_API_KEY=tu_api_key
```

> **Nota:** Las credenciales de ejemplo son para el ambiente de integración de Transbank.

## 🏃 Ejecución

### Modo desarrollo
```bash
npm run start:dev
```

### Modo producción
```bash
npm run build
npm run start:prod
```

### Con Docker
```bash
docker-compose up
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación API (Swagger)

Una vez iniciado el servidor, accede a la documentación interactiva en:

```
http://localhost:3000/api
```

## 🔌 Endpoints

### POST `/webpay/crear-transaccion`

Crea una nueva transacción de pago en Webpay.

**Request Body:**
```json
{
  "buyOrder": "orden-123",
  "sessionId": "sesion-123",
  "amount": 1000,
  "returnUrl": "http://localhost:3000/webpay/retorno"
}
```

**Response:**
```json
{
  "token": "token_generado_por_transbank",
  "url": "https://webpay3gint.transbank.cl/webpayserver/initTransaction"
}
```

### GET `/webpay/retorno?token_ws=XXX`

Endpoint de retorno después del pago. Confirma la transacción y retorna el resultado.

**Response exitoso:**
```json
{
  "exitoso": true,
  "mensaje": "Transacción confirmada exitosamente",
  "datos": {
    "vci": "TSY",
    "amount": 1000,
    "status": "AUTHORIZED",
    "buy_order": "orden-123",
    "session_id": "sesion-123",
    "card_detail": {
      "card_number": "XXXX-XXXX-XXXX-1234"
    },
    "accounting_date": "0212",
    "transaction_date": "2026-02-12T21:40:00.000Z",
    "authorization_code": "123456",
    "payment_type_code": "VD",
    "response_code": 0,
    "installments_number": 0
  }
}
```

**Response con error:**
```json
{
  "exitoso": false,
  "mensaje": "Error al confirmar la transacción",
  "error": "ERROR_TRANSACCION"
}
```

## 🧪 Tarjetas de Prueba (Ambiente de Integración)

Para probar en el ambiente de integración de Transbank:

- **Tarjeta:** 4051 8856 0044 6623
- **CVV:** 123
- **Fecha de expiración:** Cualquier fecha futura
- **RUT:** 11.111.111-1
- **Contraseña:** 123

## 🏗️ Estructura del Proyecto

```
backend/
├── src/
│   ├── webpay/
│   │   ├── dto/
│   │   │   └── crear-transaccion.dto.ts
│   │   ├── webpay.controller.ts
│   │   ├── webpay.service.ts
│   │   └── webpay.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env.example
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

## Seguridad

- **Helmet**: Implementado para proteger las cabeceras HTTP y mitigar ataques comunes.
- **Throttler (Rate Limiting)**: Configurado para permitir un máximo de 10 peticiones cada 60 segundos por dirección IP, protegiendo contra abusos y ataques de fuerza bruta.
- **NUNCA** subas archivos `.env` al repositorio.
- **NUNCA** compartas tus credenciales de Transbank.
- Usa variables de entorno para todas las configuraciones sensibles.
- En producción, usa credenciales de producción de Transbank.

## 📝 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📧 Soporte

Para soporte de Transbank, visita: https://www.transbankdevelopers.cl/
