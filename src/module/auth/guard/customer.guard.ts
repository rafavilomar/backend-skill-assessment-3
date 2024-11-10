import { CanActivate, ForbiddenException, Injectable } from "@nestjs/common"
import { AuthService } from "../auth.service"

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {}

  async canActivate(): Promise<boolean> {

    const user = await this.authService.getLoggedUser()

    if (user.role.name !== 'Customer') {
      throw new ForbiddenException('You do not have the required access this resource')
    }

    return true
  }
}