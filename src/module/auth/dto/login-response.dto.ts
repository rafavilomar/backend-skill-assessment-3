import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/module/user/dto/user.dto";

export class LoginResponseDto {
    @ApiProperty()
    accessToken: string;
    @ApiProperty({type: UserDto})
    user: UserDto
}