import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 8080;

function applySwagger(
  app: INestApplication,
  options: {
    path: string;
    title?: string;
    description?: string;
    version?: string;
  },
): void {
  const path = options.path;
  const title = options.title ?? 'API';
  const description = options.description;
  const version = options.version ?? 'dev';

  const builder = new DocumentBuilder();
  builder.setTitle(title).setVersion(version);
  if (description) {
    builder.setDescription(description);
  }
  const config = builder.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}

async function bootstrap(): Promise<INestApplication> {
  const app: INestApplication = await NestFactory.create(AppModule);
  applySwagger(app, {
    path: 'swagger',
  });
  await app.listen(port);
  return app;
}

bootstrap().then(async (app) => {
  console.log(`Application is running on: ${await app.getUrl()}`);
});
