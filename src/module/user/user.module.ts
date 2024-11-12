import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { RoleModule } from "../role/role.module";
import { Order } from "../order/entity/order.entity";

@Module({
    controllers: [],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User, Order]), RoleModule],
    exports: [UserService]
})
export class UserModule {}