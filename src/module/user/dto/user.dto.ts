import { RoleDto } from "src/module/role/dto/role.dto";

export class UserDto {
    id: number;
    name: string;
    email: string;
    role: RoleDto;
}