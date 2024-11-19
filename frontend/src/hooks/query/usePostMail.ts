import { MailResponse } from '@/types/login.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useEndpoints from '../useEndpoints'

const usePostMail = () => {
	const queryClient = useQueryClient()
	const { data: endpoints } = useEndpoints()

	const postMail = async ({ accessToken }: { accessToken: string }) => {
		if (!endpoints) {
			throw new Error('Endpoints are not available')
		}

		const headers = { Authorization: 'Bearer ' + accessToken }

		const response = await fetch(endpoints.mailPost, {
			method: 'POST',
			headers,
			credentials: 'include',
		})

		const checkResult = await checkResponse(response)

		if (checkResult) {
			return checkResult
		}

		return checkResult
	}
	const checkResponse = async (response: Response): Promise<boolean> => {
		const data = (await response.json()) as MailResponse

		if (response.status != 201) {
			return false
		}

		console.log({ postMessage: data.message })

		return true
	}

	return useMutation(postMail)
}

export default usePostMail
