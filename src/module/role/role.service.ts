import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {
    private readonly CUSTOMER_ROLE = 'Customer';
    private readonly ADMIN_ROLE = 'Admin';

    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

    async getCustomerRole(): Promise<Role> {
        return await this.roleRepository.findOne({
            where: {
                name: this.CUSTOMER_ROLE
            }
        })
    }

    async getAdminRole(): Promise<Role> {
        return await this.roleRepository.findOne({
            where: {
                name: this.ADMIN_ROLE
            }
        })
    }

    async fillRoles(): Promise<void> {
        const roleExists = await this.roleRepository.exists({where: {deletedAt: null}})

        if (!roleExists) {
            await Promise.all([
                this.roleRepository.save({
                    name: this.CUSTOMER_ROLE,
                    description: 'Customer role',
                    createdAt: new Date(),
                }),
                this.roleRepository.save({
                    name: this.ADMIN_ROLE,
                    description: 'Admin role',
                    createdAt: new Date(),
                })
            ])
        }
    }
}