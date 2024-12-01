import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';

import { AdminGuard } from '../guards/admin.guard';
import { JwtGuard } from '../guards/jwt.guard';

export const Auth = (role: Role = 'STUDENT') =>
	applyDecorators(role === Role.ADMIN ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard));
