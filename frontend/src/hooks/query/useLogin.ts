import { UnifiedResponse } from '@/types/login.types'
import { setLoginCookie } from '@/utils/cookie'
import { getEndpoints } from '@/utils/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import { isArray } from 'util'

const useLogin = () => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

	const cookies = useCookies()

	const login = async ({
		mail,
		password,
	}: {
		mail: string
		password: string
	}) => {
		const response = await fetch(endpoints.login, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: mail, password }),
			credentials: 'include',
		})

		let errorField: 'mail' | 'password'

		const data = (await response.json()) as UnifiedResponse

		if (response.status == 400) {
			if (isArray(data.message)) {
				if (data.message.some(str => str.includes('email'))) {
					errorField = 'mail'
					return { errorField }
				}
				if (data.message.some(str => str.includes('Password'))) {
					errorField = 'password'
					return { errorField }
				}
				if (data.message.some(str => str.includes('User'))) {
					errorField = 'mail'
					return { errorField }
				}
			}

			if (data.message.includes('email')) {
				errorField = 'mail'
				return { errorField }
			}
			if (data.message.includes('Password')) {
				errorField = 'password'
				return { errorField }
			}
			if (data.message.includes('User')) {
				errorField = 'mail'
				return { errorField }
			}
		}

		setLoginCookie(cookies, data.accessToken, data.refreshToken)
		return { payload: data as UnifiedResponse }
	}

	return useMutation(login)
}

export default useLogin
