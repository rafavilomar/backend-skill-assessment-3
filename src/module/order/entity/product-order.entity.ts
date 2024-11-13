import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/module/product/product.entity";

@Entity()
export class ProductOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;

    @ManyToOne(() => Order, (order) => order.productOrders, {nullable: false})
    order: Order; 

    @ManyToOne(() => Product, (product) => product.productOrders, {nullable: false})
    product: Product;
}