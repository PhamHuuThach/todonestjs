import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation toan cuc
  app.useGlobalPipes(new ValidationPipe());

  // cau hinh swagger
  const config = new DocumentBuilder()
    .setTitle("Nest API")
    .setDescription("The Nest API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  await app.listen(3000);
}
bootstrap();
