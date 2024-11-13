import { ApiProperty } from "@nestjs/swagger";
import { RoleDto } from "src/module/role/dto/role.dto";

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty({type: RoleDto})
    role: RoleDto;
}