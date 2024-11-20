import MailReceiveForm from '@/components/form/MailReceiveForm'
import SendCodeBtn from '@/components/sendCode/SendCodeBtn'
import { AccessToken } from '@/types/store.types'
import { jwtDecode } from 'jwt-decode'
import { NextPage } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const MailCodePage: NextPage = async () => {
	const cookieStore = await cookies()

	const accessToken = cookieStore.get('accessToken')?.value || ''
	const refreshToken = cookieStore.get('refreshToken')?.value || ''

	if (!accessToken) {
		redirect('/login')
	}

	const isEmailVerif = jwtDecode<AccessToken>(accessToken).emailVerification
	const userEmail = jwtDecode<AccessToken>(accessToken).email

	if (isEmailVerif) {
		redirect('/')
	}

	return (
		<div className='flex h-screen m-auto px-6 '>
			<div className='bg-menu_color flex-1 rounded-menu_radius  m-auto min-h-[400px] flex  items-center gap-10'>
				<div className='pl-10 text-wrap max-w-48 font-semibold text-[24px]'>
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
