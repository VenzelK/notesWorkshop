import LoginForm from '@/components/form/LoginForm'
import Icon from '@/components/icon/Icon'
import { NextPage } from 'next'

const page: NextPage = () => {
	return (
		<div className='flex flex-row gap-10 h-screen justify-center items-center m-auto   px-6'>
			<div className='flex flex-row justify-between bg-menu_color w-4/12 rounded-menu_radius bg-opacity-5 pl-8 pr-4 h-[420px] items-center'>
				<div className='font-bold text-text_color text-[24px] text-wrap max-w-36 '>
					Вход в Мастерскую заметок
				</div>
				<div className=''>
					<Icon type='logo' size={182} className='text-logo_color' />
				</div>
			</div>

			<LoginForm className='bg-menu_color flex-1 rounded-menu_radius flex flex-col justify-between pt-28' />
		</div>
	)
}

export default page
