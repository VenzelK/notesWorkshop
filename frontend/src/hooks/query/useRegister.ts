import { UnifiedResponse } from '@/types/login.types'
import { getEndpoints } from '@/utils/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import { isArray } from 'util'

const useRegister = () => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

	const cookies = useCookies()

	const register = async ({
		mail,
		password,
	}: {
		mail: string
		password: string
	}) => {
		const response = await fetch(endpoints.register, {
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
				if (data.message.some(str => str.includes('password'))) {
					errorField = 'password'
					return { errorField }
				}
			}
			if (data.message.includes('User')) {
				errorField = 'mail'
				return { errorField }
			}
		}

		cookies.set('accessToken', data.accessToken, { path: '/', sameSite: 'lax' })
		cookies.set('refreshToken', data.refreshToken, {
			path: '/',
			sameSite: 'lax',
		})

		return { payload: data as UnifiedResponse }
	}

	return useMutation(register)
}

export default useRegister
