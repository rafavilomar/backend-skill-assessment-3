import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/entity/order.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column({type: 'float'})
    price: number;

    @Column({type: 'float'})
    stock: number;

    @Column()
    createdAt: Date = new Date();

    @Column({nullable: true})
    updatedAt?: Date;

    @Column({nullable: true})
    deletedAt?: Date;

    @ManyToMany(() => Order, (order) => order.products)
    orders: Order[];
}