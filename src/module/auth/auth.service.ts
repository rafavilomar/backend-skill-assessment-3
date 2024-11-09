import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  AuthenticationClient,
  ManagementClient,
} from 'auth0'
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    
  private readonly auth0AuthenticationClient: AuthenticationClient
  private readonly auth0ManagementClient: ManagementClient
  private readonly CONNECTION = 'Username-Password-Authentication'

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
}