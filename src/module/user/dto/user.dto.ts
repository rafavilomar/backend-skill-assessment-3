import { RoleDto } from "src/module/role/dto/role.dto";

export class UserDto {
    name: string;
    email: string;
    role: RoleDto;
}