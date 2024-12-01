import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { verify } from 'argon2';

import { UserService } from '../user/user.service';
import { IAuthResponse, IAuthTokens, TUserWithoutPassword } from './auth.interface';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
	private static readonly ACCESS_TOKEN_EXPIRATION_DATE = '1d';
	private static readonly REFRESH_TOKEN_EXPIRATION_DATE = '7d';

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDto): Promise<IAuthResponse> {
		await this.ensureEmailIsUnique(dto.email);
		const user = await this.userService.create(dto);
		return await this.generateAuthResponse(user);
	}

	async login(dto: LoginDto): Promise<IAuthResponse> {
		const user = await this.validateUserCredentials(dto);
		return await this.generateAuthResponse(user);
	}

	async refreshTokens(refreshToken: string): Promise<IAuthResponse> {
		if (!refreshToken) throw new UnauthorizedException('Пожалуйста авторизуйся');

		const payload = await this.jwtService.verifyAsync(refreshToken);
		if (!payload) throw new UnauthorizedException('Неверный refresh токен');

		const user = await this.userService.findOneById(payload.id);
		if (!user) {
			throw new UnauthorizedException('Пользователь не найден');
		}

		return await this.generateAuthResponse(user);
	}

	private async ensureEmailIsUnique(email: string): Promise<void> {
		const isExists = await this.userService.findOneByEmail(email);
		if (isExists) throw new BadRequestException('Пользователь с таким email уже существует!');
	}

	private async validateUserCredentials(dto: LoginDto): Promise<User> {
		const user = await this.userService.findOneByEmail(dto.email);
		if (!user) throw new BadRequestException('Неверный электронный почта или пароль!');

		const isValidPassword = await verify(user.password, dto.password);
		if (!isValidPassword) throw new BadRequestException('Неверный электронный почта или пароль!');

		return user;
	}

	private async generateTokens(userId: string, role: Role): Promise<IAuthTokens> {
		const payload = { id: userId, role };
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: AuthService.ACCESS_TOKEN_EXPIRATION_DATE,
		});
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: AuthService.REFRESH_TOKEN_EXPIRATION_DATE,
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	private async generateAuthResponse(user: User): Promise<IAuthResponse> {
		const tokens = await this.generateTokens(user.id, user.role);
		const userWithoutPassword = this.omitPassword(user);
		return { user: userWithoutPassword, ...tokens };
	}

	private omitPassword(user: User): TUserWithoutPassword {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}
}
