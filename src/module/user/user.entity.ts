import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    updatedAt?: Date;

    @Column()
    deletedAt?: Date;
}