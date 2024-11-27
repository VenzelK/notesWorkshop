'use client'

import useLogout from '@/hooks/query/useLogout'

interface LogoutBtnProps {
	redirectToLogin: () => void
}

const LogoutBtn: React.FC<LogoutBtnProps> = ({ redirectToLogin }) => {
	const { mutate: logoutMutate } = useLogout()

	const handleLogout = () => {
		logoutMutate()
		redirectToLogin()
	}

	return (
		<button
			className='bg-red  px-10 py-2 rounded-menu_radius'
			onClick={handleLogout}
		>
			Выйти из аккаунта
		</button>
	)
}

export default LogoutBtn
