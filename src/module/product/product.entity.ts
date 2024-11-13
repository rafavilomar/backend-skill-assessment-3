import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductOrder } from "../order/entity/product-order.entity";

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

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
    productOrders: ProductOrder[];
}