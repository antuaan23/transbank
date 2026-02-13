# Proyecto Transbank - Integración Webpay Plus

Backend para la integración de pagos con Transbank Webpay Plus, desarrollado con NestJS.

## Descripción

Este proyecto permite realizar transacciones de pago utilizando la API de Webpay Plus de Transbank. El backend maneja la creación y confirmación de transacciones.

## Estructura del Proyecto

```
Transbank/
├── backend/     # API REST con NestJS
│   ├── src/
│   │   ├── webpay/        # Módulo de integración con Transbank
│   │   └── main.ts        # Punto de entrada de la aplicación
│   └── package.json
├── docker-compose.yml     # Configuración de Docker para desarrollo
└── README.md
```

## Tecnologías Utilizadas

### Backend
- **NestJS** - Framework Node.js para aplicaciones escalables
- **TypeScript** - Lenguaje de programación
- **Transbank SDK** - SDK oficial de Transbank para Webpay Plus
- **Swagger** - Documentación de API
- **Docker** - Contenedorización

## Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Docker** y **Docker Compose** (opcional, para desarrollo con contenedores)

## Instalación

### Opción 1: Desarrollo Local

#### Backend

```bash
cd backend
npm install
```

### Opción 2: Desarrollo con Docker

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

## Configuración

### Backend

1. Crea un archivo `.env` en la carpeta `backend/` siguiendo el estandar del .env.example


**Nota:** Para desarrollo y pruebas, puedes usar las credenciales de integración proporcionadas por Transbank.

## Ejecución

### Desarrollo Local

#### Backend

```bash
cd backend
npm run start:dev
```

El backend estará disponible en `http://localhost:3000`

### Con Docker

```bash
# Iniciar todos los servicios
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Detener los servicios
docker-compose down
```

## API Endpoints

### Crear Transacción

```http
POST /webpay/crear-transaccion
Content-Type: application/json

{
  "buyOrder": "orden_compra_123",
  "sessionId": "sesion_123",
  "amount": 10000,
  "returnUrl": "http://localhost:3000/webpay/return"
}
```

### Confirmar Transacción

```http
GET /webpay/retorno?token_ws=token_recibido
```

## Documentación de la API

Una vez que el backend esté corriendo, puedes acceder a la documentación de Swagger en:

```
http://localhost:3000/api
```

## Pruebas

### Backend

```bash
cd backend
npm run test          # Ejecutar pruebas unitarias
npm run test:watch    # Modo watch
npm run test:cov      # Con cobertura
npm run test:e2e      # Pruebas end-to-end
```

## Seguridad

- **NUNCA** subas archivos `.env` al repositorio
- **NUNCA** compartas tus credenciales de Transbank
- Usa variables de entorno para todas las configuraciones sensibles
- En producción, usa credenciales de producción de Transbank

## Notas Importantes

- Este proyecto está configurado para usar el ambiente de **integración** de Transbank
- Para producción, debes cambiar el ambiente a `Environment.Production` en el servicio de Webpay
- Las transacciones en modo integración son simuladas y no realizan cargos reales

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y de uso interno.

## Enlaces Útiles

- [Documentación de Transbank](https://www.transbankdevelopers.cl/)
- [Documentación de NestJS](https://docs.nestjs.com/)

