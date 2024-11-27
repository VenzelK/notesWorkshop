import { Cookies } from 'next-client-cookies'

export const setLoginCookie = (
	cookies: Cookies,
	accessToken: string,
	refreshToken: string
) => {
	cookies.set('accessToken', accessToken, {
		path: '/',
		sameSite: 'Strict',
	})
	cookies.set('refreshToken', refreshToken, {
		path: '/',
		sameSite: 'Strict',
	})
}
