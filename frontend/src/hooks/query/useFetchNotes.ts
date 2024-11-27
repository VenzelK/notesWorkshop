import { StoreNotesData } from '@/types/notes.types'
import { SearchDataStoreValue } from '@/types/store.types'
import { getEndpoints } from '@/utils/query'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import useRefreshToken from './useRefreshToken'

const useFetchNotes = ({ page }: { page: number }) => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

	const cookies = useCookies()

	const { mutate: refreshTokens } = useRefreshToken({ cookies })

	const fetchNotes = async () => {
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

		console.log({ accessToken, refreshToken })

		const headers = {
			Authorization: 'Bearer ' + accessToken,
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
		}
		const searchData = queryClient.getQueryData<SearchDataStoreValue>([
			'search',
		])

		const queryObject = {
			page: page.toString() || '1',
			limit: searchData?.limit.toString() || '28',
			sortBy: searchData?.sortType || 'date',
		}

		const tags = searchData?.searchTags || []
		const params = new URLSearchParams(queryObject)

		if (tags.length > 0) {
			tags.forEach(tag => {
				tag && params.append('tags', tag)
			})
		}

		const response = await fetch(endpoints.getNotes + '?' + params.toString(), {
			headers,
			credentials: 'include',
		})

		if (response.status === 401) {
			refreshTokens()
			return fetchNotes()
		}

		if (!response.ok) {
			throw new Error('Failed to fetch notes')
		}

		return response.json() as Promise<StoreNotesData>
	}

	return useQuery<StoreNotesData, Error>(['notes', page], fetchNotes, {
		retry: false,
		keepPreviousData: true,
	})
}

export default useFetchNotes
