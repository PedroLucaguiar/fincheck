import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepo: UsersRepository) { }

  async create(CreateUserDto: CreateUserDto) {
    const { name, email, password } = CreateUserDto;

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


    return {
      name: user.name,
      email: user.email,
    };

  }
}
