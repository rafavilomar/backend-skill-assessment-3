import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { RoleService } from './module/role/role.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  seed(app)
}
bootstrap(); 

function seed(app: INestApplication) {
  app.get(RoleService).fillRoles()
} 
