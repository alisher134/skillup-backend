import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { IAuthResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly refreshTokenService: RefreshTokenService,
	) {}

	@Post('register')
	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({
		status: 201,
		description: 'Регистрация пользователя прошла успешно',
	})
	@ApiResponse({
		status: 400,
		description: 'Пользователь с таким email уже существует',
	})
	@HttpCode(HttpStatus.CREATED)
	async register(
		@Body() dto: RegisterDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<IAuthResponse> {
		const { refreshToken, ...response } = await this.authService.register(dto);

		this.refreshTokenService.saveRefreshTokenToCookies(res, refreshToken);

		return response;
	}

	@Post('login')
	@ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiResponse({
		status: 200,
		description: 'Авторизация пользователя прошла успешно',
	})
	@ApiResponse({
		status: 400,
		description: 'Неверный электронный почта или пароль',
	})
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<IAuthResponse> {
		const { refreshToken, ...response } = await this.authService.login(dto);

		this.refreshTokenService.saveRefreshTokenToCookies(res, refreshToken);

		return response;
	}

	@Post('refresh')
	@ApiOperation({ summary: 'Обновление токенов' })
	@ApiResponse({
		status: 200,
		description: 'Токены успешно обновлены',
	})
	@ApiResponse({
		status: 401,
		description: 'Неверный refresh токен или пользователь не авторизован',
	})
	@HttpCode(HttpStatus.OK)
	async newTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<IAuthResponse> {
		const refreshTokenFromCookies = req.cookies?.[RefreshTokenService.REFRESH_TOKEN_NAME];

		if (!refreshTokenFromCookies) throw new BadRequestException('Refresh токен отсутствует');

		const { refreshToken, ...response } =
			await this.authService.refreshTokens(refreshTokenFromCookies);

		this.refreshTokenService.saveRefreshTokenToCookies(res, refreshToken);

		return response;
	}

	@Post('logout')
	@ApiOperation({ summary: 'Выход из системы' })
	@ApiResponse({
		status: 200,
		description: 'Выход из системы выполнен успешно',
	})
	@HttpCode(HttpStatus.OK)
	async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
		this.refreshTokenService.removeRefreshTokenToCookies(res);
	}
}
