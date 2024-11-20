import { JwtPayload } from 'jwt-decode'

export interface StoreEndpoints {
	login: string
	register: string
	mailPost: string
	mailCheck: string
}

export enum Role {
	Admin = 'Admin',
	User = 'User',
}

export interface AccessToken extends JwtPayload {
	emailVerification: boolean
	email: string
	role: Role
}
