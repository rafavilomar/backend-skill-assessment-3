import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { AuthModule } from "../auth/auth.module";
import { Order } from "../order/entity/order.entity";

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [TypeOrmModule.forFeature([Product, Order]), AuthModule],
    exports: [ProductService]
})
export class ProductModule {}