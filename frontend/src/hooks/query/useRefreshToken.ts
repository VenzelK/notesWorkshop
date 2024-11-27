import { UnifiedResponse } from '@/types/login.types'
import { setLoginCookie } from '@/utils/cookie'
import { getEndpoints } from '@/utils/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Cookies } from 'next-client-cookies'

const useRefreshToken = ({ cookies }: { cookies: Cookies }) => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

	const refreshToken = cookies.get('refreshToken')

	const refresh = async () => {
		if (!refreshToken) {
			throw new Error('not login')
		}

		const headers = { Authorization: 'Bearer ' + refreshToken }

		const response = await fetch(endpoints.refresh, {
			headers,
			credentials: 'include',
		})

		if (response.status == 403 || response.status == 401) {
			throw new Error('login error')
		}

		const data = (await response.json()) as UnifiedResponse

		return data
	}

	return useMutation(['login'], refresh, {
		onSuccess(data) {
			if (data) {
				console.log({ refreshData: data })

				setLoginCookie(cookies, data.accessToken, data.refreshToken)
				return data
			}
		},
	})
}

export default useRefreshToken
