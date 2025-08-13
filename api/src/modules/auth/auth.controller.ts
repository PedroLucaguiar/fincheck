import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';


@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) { }

  @Post('sigin')
  signin(@Body() signinDto: SigninDto) {
    return this.AuthService.signin(signinDto);
  }

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.AuthService.signup(signupDto);
  }
}


/* Rever a aula de autenticação ta dando erro , volra mais ou menos no tempo 1hora e 12 min*/