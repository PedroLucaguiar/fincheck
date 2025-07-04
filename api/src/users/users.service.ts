import {Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService){}

  create(createUserDto: CreateUserDto) {
    this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      }
    });
    return user;
  }
}
