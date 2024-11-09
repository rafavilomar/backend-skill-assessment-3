import { Injectable, Logger, Scope, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  AuthenticationClient,
  ManagementClient,
} from 'auth0'
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import axios from "axios";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly auth0AuthenticationClient: AuthenticationClient
  private readonly auth0ManagementClient: ManagementClient
  private readonly CONNECTION = 'Username-Password-Authentication'
  private readonly PASSWORD_GRANT_TYPE = 'password'
  private readonly SCOPE = 'openid profile email'

  constructor(private readonly userService: UserService) {
    const credentials = {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    }

    this.auth0AuthenticationClient = new AuthenticationClient({ ...credentials })
    this.auth0ManagementClient = new ManagementClient({ ...credentials })
  }

  async createUser(data: CreateUserDto): Promise<void> {
      const user = await this.auth0ManagementClient.users.create({
        email: data.email,
        name: data.name,
        connection: this.CONNECTION,
        password: new Date().toLocaleString() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      })
      await this.userService.create(user.data)
      await this.resetPasswordMail(data.email)
  }

  async resetPasswordMail(email: string) {
    await this.auth0AuthenticationClient.database.changePassword({
        email,
        connection: this.CONNECTION,
    })
  }

  async login(data: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await this.userService.findByEmail(data.email)
      const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        grant_type: this.PASSWORD_GRANT_TYPE,
        username: data.email,
        password: data.password,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        scope: this.SCOPE
      })

      return {
        accessToken: response.data.access_token,
        user: user
      }
    } catch (error) {
      this.logger.error('Error on login', error)
      throw new UnauthorizedException('Wrong email or password')
    }
  }
}