import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './auth.strategy'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UserModule],
  exports: [PassportModule, AuthService],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
