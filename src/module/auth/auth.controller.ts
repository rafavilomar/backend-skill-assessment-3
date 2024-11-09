import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ResponseDto } from "src/utils/response.dto";

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('create')
    async createUser(@Body() data: CreateUserDto): Promise<ResponseDto<void>> {
        await this.authService.createUser(data)
        return {
            status: 200,
            data: null,
            message: 'User created successfully'
        }
    }
}