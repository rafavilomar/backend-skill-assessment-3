import { UserDto } from "src/module/user/dto/user.dto";

export class LoginResponseDto {
    accessToken: string;
    user: UserDto
}