'use client'

import {
	StoreEndpoints,
	StoreLogin,
	StoreSearchData,
} from '@/types/store.types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface TanStackProviderProps {
	children: React.ReactNode
	data: Record<
		'login' | 'endpoints' | 'search',
		StoreEndpoints | StoreLogin | StoreSearchData
	>
}

const queryClient = new QueryClient()

const TanStackProvider: React.FC<TanStackProviderProps> = ({
	children,
	data,
}) => {
	queryClient.setQueryDefaults(['endpoints'], {
		queryFn: () => {
			return data.endpoints
		},
	})

	queryClient.setQueryDefaults(['login'], {
		queryFn: () => {
			return data.login
		},
	})

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
