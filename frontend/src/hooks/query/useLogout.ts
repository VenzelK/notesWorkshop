import { setLoginCookie } from '@/utils/cookie'
import { getEndpoints } from '@/utils/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import useRefreshToken from './useRefreshToken'

const useLogout = () => {
	const queryClient = useQueryClient()
	const endpoints = getEndpoints()

	const cookies = useCookies()

	const { mutate: refreshTokens } = useRefreshToken({ cookies })

	const logout = async () => {
		const response = await fetch(endpoints.logout, {
			credentials: 'include',
		})

		setLoginCookie(cookies, 'delete', 'delete')

		return
	}

	return useMutation(logout)
}

export default useLogout
