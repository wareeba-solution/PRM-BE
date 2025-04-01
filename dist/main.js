import './build-workarounds';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerService } from './swagger/swagger.service';
async function bootstrap() {
    const logger = new Logger('Bootstrap');
    try {
        const app = await NestFactory.create(AppModule);
        const configService = app.get(ConfigService);
        const swaggerService = new SwaggerService();
        app.enableCors({
            origin: configService.get('app.cors.origins'),
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            credentials: true,
        });
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            validationError: { target: false, value: false },
        }));
        swaggerService.setup(app);
        const port = configService.get('app.port') || 3000;
        await app.listen(port);
        logger.log(`Application is running on: http://localhost:${port}`);
        logger.log(`API documentation available at: http://localhost:${port}/api-docs`);
        return app;
    }
    catch (error) {
        logger.error('Failed to initialize application:');
        logger.error(error);
        process.exit(1);
    }
}
bootstrap().catch(err => {
    console.error('Critical error during application bootstrap:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map