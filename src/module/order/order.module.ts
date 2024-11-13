import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entity/order.entity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";
import { OrderService } from "./order.service";
import { ProductService } from "../product/product.service";
import { OrderController } from "./order.controller";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { ProductOrder } from "./entity/product-order.entity";
import { PaymentModule } from "../payment/payment.module";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, User, ProductOrder]), AuthModule, UserModule, PaymentModule],
    controllers: [OrderController],
    providers: [OrderService, ProductService, AuthService],
    exports: [OrderService],
})
export class OrderModule {}