import { JWTPayload } from 'jose'
import { SortType } from './notes.types'

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

export interface AccessToken extends JWTPayload {
	emailVerification: boolean
	email: string
	role: Role
}

export interface SearchDataStoreValue {
	searchTags: string[]
	searchTagsString: string
	sortType: SortType
	limit: number
}
