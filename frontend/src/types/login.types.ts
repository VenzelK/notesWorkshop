export interface UnifiedResponse {
	message: string[] | string
	accessToken: string
	refreshToken: string
}

export interface MailResponse {
	message?: string
}
