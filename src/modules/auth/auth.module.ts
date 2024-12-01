import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

import { getJwtConfig } from '@/config/jwt.config';
import { JwtStrategy } from '@/strategy/jwt.strategy';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getJwtConfig,
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, RefreshTokenService, JwtStrategy],
})
export class AuthModule {}
