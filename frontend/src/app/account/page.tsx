import * as jwt from '@/actions/jwt'
import LogoutBtn from '@/components/logoutBtn/LogoutBtn'
import { NextPage } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCheckboxSharp } from 'react-icons/io5'
import { MdIndeterminateCheckBox } from 'react-icons/md'

const AccountPage: NextPage = async () => {
	const cookiesStore = await cookies()

	const tokenPayload = await jwt.decodeAccessToken(
		cookiesStore.get('accessToken')?.value || ''
	)

	if (!tokenPayload) {
		redirect('/login')
	}

	const redirectToLogin = async () => {
		'use server'
		redirect('/login')
	}

	const { email, emailVerification, role } = tokenPayload

	return (
		<div className='flex flex-col gap-10 pt-[100px] items-center h-screen'>
			<div className=' border-b-2 w-80 border-black rounded-3xl' />

			<div className='flex-1 flex flex-col gap-4 w-full max-w-xs sm:max-w-lg'>
				<div className='flex flex-row justify-between items-center'>
					<div>Почта</div>
					<div>{email}</div>
				</div>
				<div className='flex flex-row justify-between items-center'>
					<div>Роль в системе</div>
					<div>{role}</div>
				</div>
				<div className='flex flex-row justify-between items-center'>
					<div>Подтверждение почты</div>
					{emailVerification && <IoCheckboxSharp color='green' />}
					{emailVerification || <MdIndeterminateCheckBox color='red' />}
				</div>
			</div>

			<div className='mb-5'>
				<LogoutBtn redirectToLogin={redirectToLogin} />
			</div>
			<div className='mb-20'>
				<Link href='/'>
					<button className='bg-green px-10 py-2 rounded-menu_radius'>
						На главную
					</button>
				</Link>
			</div>
		</div>
	)
}
export default AccountPage
