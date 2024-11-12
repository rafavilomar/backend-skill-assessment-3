import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { IsNull, Repository } from "typeorm";
import { GetUsers200ResponseOneOfInner } from "auth0";
import { UserDto } from "./dto/user.dto";
import { RoleService } from "../role/role.service";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService
    ) {}

    async createCustomer(data: GetUsers200ResponseOneOfInner): Promise<void> {
        this.userRepository.save({
            email: data.email,
            name: data.name,
            auth0Id: data.user_id,
            createdAt: new Date(),
            role: await this.roleService.getCustomerRole()
        });
    }

    async createAdmin(data: GetUsers200ResponseOneOfInner): Promise<void> {
        this.userRepository.save({
            email: data.email,
            name: data.name,
            auth0Id: data.user_id,
            createdAt: new Date(),
            role: await this.roleService.getAdminRole()
        });
    }

    async findByEmail(email: string): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOneOrFail({
                where: {
                    email: email,
                    deletedAt: IsNull(),
                },
                relations: {role: true}
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: {
                    id: user.role.id,
                    name: user.role.name,
                    description: user.role.description
                }
            }
        } catch (error) {
            throw new Error('User not found');
        }
    }

    async findByAuth0Id(auth0Id: string): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOneOrFail({
                where: {
                    auth0Id: auth0Id,
                    deletedAt: IsNull(),
                },
                relations: {role: true}
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: {
                    id: user.role.id,
                    name: user.role.name,
                    description: user.role.description
                }
            }
        } catch (error) {
            throw new Error('User not found');
        }
    }
}