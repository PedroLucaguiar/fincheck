import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersRepository {
    constructor(private readonly prismaService: PrismaService) {}
    
        create(createDto: Prisma.UserCreateArgs) {
            return this.prismaService.user.create(createDto);
        }

    findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
        return this.prismaService.user.findUnique(findUniqueDto);
    }
}

