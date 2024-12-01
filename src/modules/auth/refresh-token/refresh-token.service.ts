import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class RefreshTokenService {
	private static readonly REFRESH_TOKEN_EXPIRATION_DATE = 7;
	public static readonly REFRESH_TOKEN_NAME = 'refresh';

	constructor(private readonly configService: ConfigService) {}

	saveRefreshTokenToCookies(res: Response, refreshToken: string) {
		const expiresIn = this.calculateExpirationDate();

		res.cookie(RefreshTokenService.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: this.configService.get<string>('DOMAIN'),
			expires: expiresIn,
			secure: true,
			sameSite: 'none',
		});
	}

	removeRefreshTokenToCookies(res: Response) {
		const expiresIn = new Date(0);

		res.cookie(RefreshTokenService.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: this.configService.get<string>('DOMAIN'),
			expires: expiresIn,
			secure: true,
			sameSite: 'none',
		});
	}

	private calculateExpirationDate(): Date {
		const expirationDays = RefreshTokenService.REFRESH_TOKEN_EXPIRATION_DATE;

		const expiresIn = new Date();
		expiresIn.setDate(expiresIn.getDate() + expirationDays);

		return expiresIn;
	}
}
