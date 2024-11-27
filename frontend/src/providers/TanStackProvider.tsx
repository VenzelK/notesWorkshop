'use client'

import { StoreSearchData } from '@/types/store.types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface TanStackProviderProps {
	children: React.ReactNode
	data: Record<'search', StoreSearchData>
}

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const TanStackProvider: React.FC<TanStackProviderProps> = ({
	children,
	data,
}) => {
	queryClient.setQueryDefaults(['search'], {
		queryFn: () => {
			return data.search
		},
	})

	return (
		<QueryClientProvider client={queryClient}>
			{children} <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default TanStackProvider
