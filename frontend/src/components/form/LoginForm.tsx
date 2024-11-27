'use client'

import useLogin from '@/hooks/query/useLogin'
import useRegister from '@/hooks/query/useRegister'
import { UnifiedResponse } from '@/types/login.types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import Input from '../input/Input'
import styles from './LoginForm.module.css'

interface LoginFormProps {
	className?: string
}

type LoginFormInputs = {
	mail: string
	password: string
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
	const [passVisible, setPassVisible] = useState(false)

	const router = useRouter()

	const { mutate: loginMutate, isLoading } = useLogin()
	const { mutate: registerMutate } = useRegister()

	const onSuccess = (response: {
		errorField?: 'mail' | 'password'
		payload?: UnifiedResponse
	}) => {
		if (response.errorField) {
			setError(response.errorField, { type: 'value' })

			return
		}
		clearErrors()

		router.push('/login/mailCode/')
	}

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<LoginFormInputs>()

	const onSubmit: SubmitHandler<LoginFormInputs> = (data, event) => {
		const eventType = (event?.nativeEvent as SubmitEvent).submitter?.id

		if (eventType == 'registerBtn') {
			registerMutate(
				{ mail: data.mail, password: data.password },
				{ onSuccess }
			)
		} else {
			loginMutate({ mail: data.mail, password: data.password }, { onSuccess })
		}
	}

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.container}>
				<div className={styles.clue_container}>
					<label className={styles.clue}>Почта</label>
					<label className={styles.clue}>Пароль</label>
				</div>
				<div className={styles.input_container}>
					<Input
						{...register('mail', { required: true })}
						type='text'
						maxLength={40}
						className={errors.mail && ' border-red'}
					/>

					<div className='relative'>
						<Input
							{...register('password', { required: true })}
							type={passVisible ? 'text' : 'password'}
							maxLength={20}
							className={`${styles.pass_input} + " " + ${
								errors.password && ' border-red'
							}`}
						/>

						<div className={styles.password_eye_container}>
							<button
								type='button'
								className={styles.eye_btn}
								onClick={() => setPassVisible(!passVisible)}
							>
								{passVisible ? <FaRegEye /> : <FaRegEyeSlash />}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.btn_container}>
				<button
					className={styles.send_btn + ' ' + styles.registration_btn}
					type='submit'
					disabled={isLoading ? true : false}
					id='registerBtn'
				>
					Зарегистрироваться
				</button>
				<button
					className={styles.send_btn + ' ' + styles.login_btn}
					type='submit'
					disabled={isLoading ? true : false}
					id='loginBtn'
				>
					Войти
				</button>
			</div>
		</form>
	)
}

export default LoginForm
