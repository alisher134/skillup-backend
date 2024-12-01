import { User } from '@prisma/client';

export type TUserWithoutPassword = Omit<User, 'password'>;

export interface IAuthTokens {
	accessToken: string;
	refreshToken?: string;
}

export interface IAuthResponse extends IAuthTokens {
	user: TUserWithoutPassword;
}
