import { SortType } from '@/types/notes.types'
import { SearchDataStoreValue } from '@/types/store.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useSearchMutation = () => {
	const queryClient = useQueryClient()

	const setSearchData = async ({
		searchTagsString,
		sortType,
	}: {
		searchTagsString: string
		sortType: SortType
	}): Promise<void> => {
		const oldData = queryClient.getQueryData<SearchDataStoreValue>(['search'])

		if (oldData) {
			if (
				oldData.searchTagsString === searchTagsString &&
				oldData.sortType === sortType
			) {
				return
			}
		}

		const searchTags = searchTagsString.split(/\s+/)

		queryClient.setQueryData<SearchDataStoreValue>(['search'], {
			searchTags,
			searchTagsString,
			sortType,
			limit: 28,
		})
	}
	return useMutation(setSearchData, {
		onSuccess: () => {
			queryClient.invalidateQueries(['notes'])
		},
	})
}

export default useSearchMutation
