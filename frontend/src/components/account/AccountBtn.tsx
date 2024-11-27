'use client'

import { Role } from '@/types/store.types'
import Link from 'next/link'
import { CiWarning } from 'react-icons/ci'
import { RxAvatar } from 'react-icons/rx'

interface AccountBtnProps {
	email: string
	emailVerification: boolean
	role: Role
}

const AccountBtn: React.FC<AccountBtnProps> = ({
	email,
	emailVerification,
	role,
}) => {
	return (
		<Link className='flex flex-row gap-5 items-center' href={'/account'}>
			<div className='flex flex-col '>
				<div className='flex flex-row gap-2 items-center'>
					{email} {emailVerification || <CiWarning color='red' size={20} />}
				</div>
				{role == Role.Admin && <p>You're a Admin</p>}
			</div>
			<RxAvatar size={30} />
		</Link>
	)
}

export default AccountBtn
