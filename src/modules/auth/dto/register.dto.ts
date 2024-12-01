import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from '@/modules/user/dto';

export class RegisterDto extends PickType(CreateUserDto, ['email', 'username', 'password']) {}
