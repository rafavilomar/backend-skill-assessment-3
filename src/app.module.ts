import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { User } from './module/user/user.entity';
import { Product } from './module/product/product.entity';
import { ProductModule } from './module/product/product.module';
import { Role } from './module/role/role.entity';
import { RoleModule } from './module/role/role.module';
import { OrderModule } from './module/order/order.module';
import { Order } from './module/order/entity/order.entity';
import { ProductOrder } from './module/order/entity/product-order.entity';
import { PaymentModule } from './module/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Role, Order, ProductOrder],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    RoleModule,
    OrderModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
