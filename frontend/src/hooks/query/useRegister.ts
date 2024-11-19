import { UnifiedResponse } from '@/types/login.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray } from 'util'
import useEndpoints from '../useEndpoints'

const useRegister = () => {
	const queryClient = useQueryClient()
	const { data: endpoints } = useEndpoints()

	const register = async ({
		mail,
		password,
	}: {
		mail: string
		password: string
	}) => {
		if (!endpoints) {
			throw new Error('Endpoints are not available')
		}

		const response = await fetch(endpoints.register, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: mail, password }),
			credentials: 'include',
		})

		const checkResult = await checkResponse(response)

		if (checkResult.payload) {
			queryClient.invalidateQueries(['login'])
			return checkResult
		}

		return checkResult
	}
	const checkResponse = async (
		response: Response
	): Promise<{
		errorField?: 'mail' | 'password'

		payload?: UnifiedResponse
	}> => {
		const data = (await response.json()) as UnifiedResponse

		if (response.status == 400) {
			if (isArray(data.message)) {
				if (data.message.some(str => str.includes('email'))) {
					return { errorField: 'mail' }
				}
				if (data.message.some(str => str.includes('password'))) {
					return { errorField: 'password' }
				}
			}
			if (data.message.includes('User already exists')) {
				return { errorField: 'mail' }
			}
		}

		return { payload: data as UnifiedResponse }
	}

	return useMutation(register)
}

export default useRegister
