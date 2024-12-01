import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({
		status: 200,
		description: 'Список всех пользователей',
	})
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Получить пользователя по ID' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь найден',
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
	})
	findOneById(@Param('id') id: string) {
		return this.userService.findOneById(id);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Удалить пользователя по ID' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно удалён',
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
	})
	remove(@Param('id') id: string) {
		return this.userService.delete(id);
	}
}
