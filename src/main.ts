import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { getCorsSettings } from './common/util/cors.settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.BACKEND_PREFIX);
  // TODO: fix cors allowed origins
  //app.enableCors(getCorsSettings(process.env.ALLOWED_ORIGINS.split(',')));
  // TODO: for dev mode this has to work!
  app.enableCors({
    origin: 'http://localhost:5173', // Hier sollte die tatsächliche Adresse deiner React-Anwendung stehen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // true, um Cookies und Anmeldeinformationen zuzulassen
    optionsSuccessStatus: 204,
  });
  await app.listen(3000);
}
bootstrap();
