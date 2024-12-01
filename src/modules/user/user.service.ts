import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';

import { RegisterDto } from '../auth/dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: RegisterDto) {
    return this.prismaService.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: await this.hashPassword(dto.password),
        avatarPath: null,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOneById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  delete(id: string): Promise<User | null> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }
}
