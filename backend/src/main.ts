import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cors from 'cors-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors(
    {
      origin: "https://incode-befc.vercel.app/",
      credentials: true, 
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    }
  ))

  const port = process.env.PORT || 5019;
  await app.listen(port);
}

bootstrap();
