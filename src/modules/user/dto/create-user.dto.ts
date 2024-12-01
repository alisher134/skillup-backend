import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'alisher@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Alisher Rakhmanov',
  })
  @IsString()
  username: string;
}
