import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { GetUsers200ResponseOneOfInner } from "auth0";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async create(data: GetUsers200ResponseOneOfInner): Promise<void> {
        this.userRepository.save({
            email: data.email,
            name: data.name,
            auth0Id: data.user_id,
            createdAt: new Date(),
        });
    }

    async findByEmail(email: string): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: email,
                    deletedAt: null
                }
            });
            return {
                name: user.name,
                email: user.email
            }
        } catch (error) {
            throw new Error('User not found');
        }
    }
}