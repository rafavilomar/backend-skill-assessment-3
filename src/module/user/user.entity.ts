import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { Order } from "../order/entity/order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    auth0Id: string;

    @Column()
    createdAt: Date = new Date();

    @Column({nullable: true})
    updatedAt?: Date;

    @Column({nullable: true})
    deletedAt?: Date;

    @ManyToOne(() => Role, (role) => role.users, {nullable: false})
    role: Role; 

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}