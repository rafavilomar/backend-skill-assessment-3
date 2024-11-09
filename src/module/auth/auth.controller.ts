import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ResponseDto } from "src/utils/response.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async createUser(@Body() data: CreateUserDto): Promise<ResponseDto<void>> {
        await this.authService.createUser(data)
        return {
            status: 200,
            data: null,
            message: 'User created successfully'
        }
    }

    @Post('login')
    async login(@Body() data: LoginDto): Promise<ResponseDto<LoginResponseDto>> {
        const response = await this.authService.login(data)
        return { status: 200, data: response, message: 'Login successful' }
    }
}