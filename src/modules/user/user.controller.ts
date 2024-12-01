import { Controller, Delete, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { UserResponse } from './user.response';
import { UserService } from './user.service';

import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
@ApiBearerAuth()
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	@ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь найден',
		type: UserResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
	})
	@HttpCode(HttpStatus.OK)
	getProfile(@CurrentUser('id') id: string): Promise<User | null> {
		return this.userService.findOneById(id);
	}

	@Auth('ADMIN')
	@Get()
	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({
		status: 200,
		description: 'Список всех пользователей',
		type: [UserResponse],
	})
	@HttpCode(HttpStatus.OK)
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Auth('ADMIN')
	@Get(':id')
	@ApiOperation({ summary: 'Получить пользователя по ID' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь найден',
		type: UserResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
	})
	@HttpCode(HttpStatus.OK)
	findOneById(@Param('id') id: string): Promise<User | null> {
		return this.userService.findOneById(id);
	}

	@Auth('ADMIN')
	@Delete(':id')
	@ApiOperation({ summary: 'Удалить пользователя по ID' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно удалён',
		type: UserResponse,
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
	})
	@HttpCode(HttpStatus.OK)
	remove(@Param('id') id: string): Promise<User | null> {
		return this.userService.delete(id);
	}
}
