import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation toàn cục
  app.useGlobalPipes(new ValidationPipe());

  // cấu hình swagger
  const config = new DocumentBuilder()
    .setTitle("Nest API")
    .setDescription("The Nest API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = parseInt(process.env.PORT as string, 10) || 3000;

  // ✨ MUST dùng 0.0.0.0 để Render detect port
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Server listening on http://0.0.0.0:${port}`);
}
bootstrap();
