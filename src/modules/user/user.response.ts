import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponse {
	@ApiProperty({
		description: 'Идентификатор пользователя',
		example: 'cj9k7mjp0000000qg82m7l46z',
	})
	id: string;

	@ApiProperty({
		description: 'Электронная почта пользователя',
		example: 'alisher@gmail.com',
	})
	email: string;

	@ApiProperty({
		description: 'Имя пользователя',
		example: 'johndoe123',
	})
	username: string;

	@ApiProperty({
		description: 'Пароль пользователя',
		example: 'securepassword123',
	})
	password: string;

	@ApiProperty({
		description: 'Путь к аватару пользователя',
		example: '/avatars/johndoe.png',
		required: false,
	})
	avatarPath?: string;

	@ApiProperty({
		description: 'Роль пользователя',
		example: 'STUDENT',
		enum: Role,
	})
	role: Role;

	@ApiProperty({
		description: 'Дата и время создания пользователя',
		example: '2024-01-01T00:00:00Z',
	})
	createdAt: Date;

	@ApiProperty({
		description: 'Дата и время последнего обновления пользователя',
		example: '2024-01-01T00:00:00Z',
	})
	updatedAt: Date;
}
