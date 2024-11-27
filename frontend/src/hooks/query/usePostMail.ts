import { MailResponse } from '@/types/login.types'
import { getEndpoints } from '@/utils/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const usePostMail = () => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

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

		const data = (await response.json()) as MailResponse

		if (response.status != 201) {
			return false
		}

		return true
	}

	return useMutation(postMail)
}

export default usePostMail
