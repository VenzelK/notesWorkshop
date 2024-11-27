import MailReceiveForm from '@/components/form/MailReceiveForm'
import SendCodeBtn from '@/components/sendCode/SendCodeBtn'
import { NextPage } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import * as jwt from '@/actions/jwt'

const MailCodePage: NextPage = async () => {
	const cookieStore = await cookies()

	const accessToken = cookieStore.get('accessToken')?.value || ''
	const refreshToken = cookieStore.get('refreshToken')?.value || ''

	const tokenPayload = await jwt.decodeAccessToken(accessToken)

	if (!tokenPayload) {
		redirect('/login')
	}

	const { emailVerification: isEmailVerif, email: userEmail } = tokenPayload

	if (isEmailVerif) {
		console.log('dada')

		redirect('/')
	}

	return (
		<div className='mailCodePage__container'>
			<div className='mailCodePage__mainContainer'>
				<div className='mailCodePage__mainContainer_text'>
					Введите код отправленный на почту {userEmail}
				</div>
				<MailReceiveForm
					accessToken={accessToken}
					refreshToken={refreshToken}
					className='flex-1'
				/>
				<div className='self-end text-nowrap'>
					<SendCodeBtn accessToken={accessToken} />
				</div>
			</div>
		</div>
	)
}
export default MailCodePage
