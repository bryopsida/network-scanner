import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.useLogger(app.get(Logger))

  const config = new DocumentBuilder()
    .setTitle('Network Scanner')
    .setDescription('An API for managing scheduled network scans')
    .setVersion('1.0')
    .addTag('scanner')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.use(helmet())
  await app.listen(3000)
}
bootstrap()
