'use server'

import { Role } from '@/types/store.types'
import { CiWarning } from 'react-icons/ci'
import { RxAvatar } from 'react-icons/rx'

interface AccountBtnProps {
	email: string
	emailVerification: boolean
	role: Role
	redirectToAccount: () => void
}

const AccountBtn: React.FC<AccountBtnProps> = ({
	email,
	emailVerification,
	role,
	redirectToAccount,
}) => {
	return (
		<button
			className='flex flex-row gap-5 items-center'
			onClick={redirectToAccount}
		>
			<p className='flex flex-col '>
				<div className='flex flex-row gap-2 items-center'>
					{email} {emailVerification || <CiWarning color='red' size={20} />}
				</div>
				{role == Role.Admin && <p>You're a Admin</p>}
			</p>
			<RxAvatar size={30} />
		</button>
	)
}

export default AccountBtn
