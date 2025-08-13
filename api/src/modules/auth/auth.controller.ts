import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { create } from 'domain';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('Login')
  authenticate(@Body() authenticateDto: AuthenticateDto) {
    return this.AuthService.authenticate(authenticateDto);

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.AuthService.signup(signupDto);
  }
}


/* Rever a aula de autenticação ta dando erro , volra mais ou menos no tempo 1hora e 12 min*/