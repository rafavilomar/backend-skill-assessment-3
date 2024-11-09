import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async create(data: CreateUserDto): Promise<void> {
        this.userRepository.save({
            email: data.email,
            name: data.name,
            auth0Id: 'auth0Id' //todo: use auth0
        });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                email: email,
                deletedAt: null
            }
        });
    }
}