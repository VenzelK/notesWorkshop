import AccountBtn from '@/components/account/AccountBtn'
import Modal from '@/components/modal/Modal'
import NoteBoard from '@/components/noteBoard/NoteBoard'
import SearchHeader from '@/components/searchHeader/SearchHeader'
import ModalProvider from '@/providers/ModalProvider'
import { cookies } from 'next/headers'

import * as jwt from '@/actions/jwt'
import { redirect } from 'next/navigation'

const Home = async () => {
	const cookieStore = await cookies()

	const accessToken = cookieStore.get('accessToken')?.value || ''

	const tokenPayload = await jwt.decodeAccessToken(accessToken)

	if (!tokenPayload) {
		redirect('/login')
		return
	}

	const { sub, role, email, emailVerification } = tokenPayload

	const redirectToLogin = async () => {
		'use server'
		redirect('/login')
	}

	return (
		<ModalProvider>
			<div className='mainPage__container'>
				<div className='mainPage__mainContainer'>
					<div className='mainPage__header'>
						<div className='mainPage__header__account'>
							<AccountBtn
								email={email}
								emailVerification={emailVerification}
								role={role}
							/>
						</div>
						<SearchHeader />
					</div>
					<div className='mainPage__mainContainer__main'>
						<NoteBoard
							userId={+(sub || 0)}
							userRole={role}
							redirectToLogin={redirectToLogin}
						/>
					</div>
				</div>
				<Modal />
			</div>
		</ModalProvider>
	)
}

export default Home
