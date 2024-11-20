import { JwtPayload } from 'jwt-decode'
import { SortType } from './notes.types'

export interface StoreEndpoints {
	login: string
	register: string
	mailPost: string
	mailCheck: string
	logout: string
	refresh: string
}

export interface StoreLogin {
	accessToken: string
	refreshToken: string
}

export interface StoreSearchData {
	searchTags: string[]
	sortType: SortType
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
