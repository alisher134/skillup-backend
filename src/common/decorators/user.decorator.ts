import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = (ctx: ExecutionContext, data: keyof User) => {
	const request = ctx.switchToHttp().getRequest();
	const user = request.user;

	if (!user) {
		throw new UnauthorizedException('Пользователь не авторизован');
	}

	return data ? user?.[data] : user;
};