import { getEndpoints } from '@/utils/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'

const useCheckMailCode = () => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

	const cookies = useCookies()

	const checkCode = async ({ values }: { values: string[] }) => {
		const headers = { Authorization: 'Bearer ' + cookies.get('accessToken') }

		const response = await fetch(
			endpoints.mailCheck + '?code=' + values.join(''),
			{
				method: 'POST',
				headers,
				credentials: 'include',
			}
		)

		if (response.status != 201) {
			return false
		}

		return true
	}

	return useMutation(checkCode)
}

export default useCheckMailCode
