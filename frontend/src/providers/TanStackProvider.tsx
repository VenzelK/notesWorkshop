'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StoreEndpoints } from '../types/store.types'

interface TanStackProviderProps {
	children: React.ReactNode
}

const TanStackProvider: React.FC<TanStackProviderProps> = ({ children }) => {
	const queryClient = new QueryClient()

	const initialData: StoreEndpoints = {
		login: 'http://localhost:4000/auth/signin',
		register: 'http://localhost:4000/auth/signup',
		mailPost: 'http://localhost:4000/mail/post',
		mailCheck: 'http://localhost:4000/mail/check',
	}

	queryClient.setQueryDefaults(['endpoints'], {
		initialData,
	})

	return (
		<QueryClientProvider client={queryClient}>
			{children} <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default TanStackProvider
