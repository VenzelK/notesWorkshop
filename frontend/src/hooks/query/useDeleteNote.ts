import { Note } from '@/types/notes.types'
import { getEndpoints } from '@/utils/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import useRefreshToken from './useRefreshToken'

const useDeleteNote = () => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

	const cookies = useCookies()

	const { mutate: refreshTokens } = useRefreshToken({ cookies })

	const deleteNote = async ({ id }: { id: string }) => {
		const loginData = queryClient.getQueryData<{
			accessToken: string
			refreshToken: string
		}>(['login'])

		let accessToken, refreshToken

		if (!loginData) {
			accessToken = cookies.get('accessToken')
			refreshToken = cookies.get('refreshToken')
		} else {
			accessToken = loginData.accessToken
			refreshToken = loginData.refreshToken
		}

		const headers = {
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json; charset=utf-8',
		}

		const response = await fetch(endpoints.deleteNote + '/' + id, {
			method: 'DELETE',
			headers,
			credentials: 'include',
		})

		if (response.status === 401) {
			refreshTokens()
			return deleteNote({ id })
		}

		if (!response.ok) {
			throw new Error('Failed to delete note')
		}

		queryClient.invalidateQueries(['notes'])

		return response.json() as Promise<Note>
	}

	return useMutation(deleteNote)
}

export default useDeleteNote
