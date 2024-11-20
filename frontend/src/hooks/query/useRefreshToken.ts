import { UnifiedResponse } from '@/types/login.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Cookies } from 'next-client-cookies'
import useEndpoints from '../useEndpoints'

const useRefreshToken = ({ cookies }: { cookies: Cookies }) => {
	const queryClient = useQueryClient()
	const { data: endpoints } = useEndpoints()

	const refresh = async ({ refreshToken }: { refreshToken: string }) => {
		if (!endpoints) {
			throw new Error('Endpoints are not available')
		}

		const headers = { Authorization: 'Bearer ' + refreshToken }

		const response = await fetch(endpoints.refresh, {
			headers,
			credentials: 'include',
		})

		const checkResult = await checkResponse(response)

		if (checkResult.payload) {
			queryClient.invalidateQueries(['login'])
			queryClient.setQueryData(['login'], checkResult.payload)
		}

		return checkResult
	}
	const checkResponse = async (
		response: Response
	): Promise<{
		payload?: UnifiedResponse
	}> => {
		const data = (await response.json()) as UnifiedResponse

		console.log({ data, rr: response.status })

		if (response.status != 200) {
			return {}
		}

		return { payload: data }
	}

	return useMutation(refresh, {
		onSuccess(data) {
			if (data.payload) {
				cookies.set('accessToken', data.payload.accessToken, {
					path: '/',
				})
				cookies.set('refreshToken', data.payload.refreshToken, {
					path: '/',
				})
			}
		},
	})
}

export default useRefreshToken
