import { EndpointsData } from '@/types/types'

const backUrlBase = process.env.BACKEND_URL

export const getEndpoints = (): EndpointsData => {
	return {
		login: backUrlBase + '/auth/signin',
		register: backUrlBase + '/auth/signup',
		mailPost: backUrlBase + '/mail/post',
		mailCheck: backUrlBase + '/mail/check',
		refresh: backUrlBase + '/auth/refresh',
		logout: backUrlBase + '/auth/logout',
		getNotes: backUrlBase + '/notes',
		postNote: backUrlBase + '/notes',
		updateNote: backUrlBase + '/notes',
		deleteNote: backUrlBase + '/notes',
	}
}
