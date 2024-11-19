import { useMutation, useQueryClient } from '@tanstack/react-query'
import useEndpoints from '../useEndpoints'

const useCheckMailCode = () => {
	const queryClient = useQueryClient()
	const { data: endpoints } = useEndpoints()

	const checkCode = async ({
		values,
		accessToken,
	}: {
		values: string[]
		accessToken: string
	}) => {
		if (!endpoints) {
			throw new Error('Endpoints are not available')
		}

		const headers = { Authorization: 'Bearer ' + accessToken }

		const response = await fetch(
			endpoints.mailCheck + '?code=' + values.join(''),
			{
				method: 'POST',
				headers,
				credentials: 'include',
			}
		)

		const checkResult = await checkResponse(response)

		if (checkResult) {
			return checkResult
		}

		return checkResult
	}
	const checkResponse = async (response: Response): Promise<boolean> => {
		if (response.status != 201) {
			return false
		}

		return true
	}

	return useMutation(checkCode)
}

export default useCheckMailCode
