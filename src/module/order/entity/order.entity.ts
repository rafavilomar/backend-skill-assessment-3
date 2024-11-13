import { User } from "src/module/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../order-status.enum";
import { ProductOrder } from "./product-order.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: OrderStatus})
    status: OrderStatus;

    @Column()
    tax: number;

    @Column()
    subtotal: number;

    @Column()
    total: number;

    @Column()
    createdAt: Date = new Date();

    @Column({nullable: true})
    updatedAt?: Date;

    @Column({nullable: true})
    deletedAt?: Date;

    @ManyToOne(() => User, (user) => user.orders, {nullable: false})
    user: User; 

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
    productOrders: ProductOrder[];
}