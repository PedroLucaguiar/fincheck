import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: '7d'},
      secret: 'env.jwtSecret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthService],
  exports: [],
  
})
export class AuthModule {}
