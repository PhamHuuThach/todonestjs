// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import { ValidationPipe } from "@nestjs/common";
// import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // validation toàn cục
//   app.useGlobalPipes(new ValidationPipe());

//   // cấu hình swagger
//   const config = new DocumentBuilder()
//     .setTitle("Nest API")
//     .setDescription("The Nest API description")
//     .setVersion("1.0")
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup("api/docs", app, document);

//   const port = parseInt(process.env.PORT as string, 10) || 3000;

//   // ✨ MUST dùng 0.0.0.0 để Render detect port
//   await app.listen(port, "0.0.0.0");

//   console.log(`🚀 Server listening on http://0.0.0.0:${port}`);
// }
// bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("API with NestJS")
    .setDescription("API developed throughout the API with NestJS course")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  const port = configService.get("PORT") ?? 3000;

  await app.listen(port, "0.0.0.0");
}
bootstrap();
