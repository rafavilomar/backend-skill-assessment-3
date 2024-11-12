import { Product } from "src/module/product/product.entity";
import { User } from "src/module/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../order-status.enum";

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

    @ManyToMany(() => Product, (product) => product.orders)
    @JoinTable()
    products: Product[];
}