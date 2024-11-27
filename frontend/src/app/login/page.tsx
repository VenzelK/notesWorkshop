import LoginForm from '@/components/form/LoginForm'
import Icon from '@/components/icon/Icon'
import { NextPage } from 'next'

const page: NextPage = () => {
	return (
		<div className='loginPageContainer'>
			<div className='loginPageHead'>
				<div className='loginPageHead__text'>Вход в Мастерскую заметок</div>
				<div className=''>
					<Icon type='logo' size={120} className='text-logo_color' />
				</div>
			</div>

			<LoginForm className='loginPageMain__form' />
		</div>
	)
}

export default page
