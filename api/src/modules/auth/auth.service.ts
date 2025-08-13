import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository, private readonly jwtService: JwtService) { }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new ConflictException('Email já usado');
    }

    const hashedPassword = await hash(password, 12);


    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [        // Income
              { name: 'Salário', icons: 'salary', Type: 'INCOME' },
              { name: 'Freelance', icons: 'freelance', Type: 'INCOME' },
              { name: 'Outro', icons: 'other', Type: 'INCOME' },
              // Expense
              { name: 'Casa', icons: 'home', Type: 'EXPENSE' },
              { name: 'Alimentação', icons: 'food', Type: 'EXPENSE' },
              { name: 'Educação', icons: 'education', Type: 'EXPENSE' },
              { name: 'Lazer', icons: 'fun', Type: 'EXPENSE' },
              { name: 'Mercado', icons: 'grocery', Type: 'EXPENSE' },
              { name: 'Roupas', icons: 'clothes', Type: 'EXPENSE' },
              { name: 'Transporte', icons: 'transport', Type: 'EXPENSE' },
              { name: 'Viagem', icons: 'travel', Type: 'EXPENSE' },
              { name: 'Outro', icons: 'other', Type: 'EXPENSE' },]
          }
        }
      },
    });


    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId })
  };
}
