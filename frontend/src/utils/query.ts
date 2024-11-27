import { EndpointsData } from '@/types/types'

export const getEndpoints = (): EndpointsData => {
	return {
		login: 'http://localhost:4000/auth/signin',
		register: 'http://localhost:4000/auth/signup',
		mailPost: 'http://localhost:4000/mail/post',
		mailCheck: 'http://localhost:4000/mail/check',
		refresh: 'http://localhost:4000/auth/refresh',
		logout: 'http://localhost:4000/auth/logout',
		getNotes: 'http://localhost:4000/notes',
		postNote: 'http://localhost:4000/notes',
		updateNote: 'http://localhost:4000/notes',
		deleteNote: 'http://localhost:4000/notes',
	}
}
