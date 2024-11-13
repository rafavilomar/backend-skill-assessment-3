import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { RoleService } from './module/role/role.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Skill Assessment API - Rafael Vilomar')
    .setVersion('1.0')
    .addSecurity('bearer', {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'})
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT);
  seed(app)
}
bootstrap(); 

function seed(app: INestApplication) {
  app.get(RoleService).fillRoles()
} 
