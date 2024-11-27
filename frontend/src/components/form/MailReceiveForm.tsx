'use client'
import useCheckMailCode from '@/hooks/query/useCheckMailCode'
import useRefreshToken from '@/hooks/query/useRefreshToken'
import { useIsFetching } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { StatefulPinInput } from 'react-input-pin-code'
import styles from './MailReceiverForm.module.css'
interface MailReceiveFormProps {
	className?: string
	accessToken: string
	refreshToken: string
}

const MailReceiveForm: React.FC<MailReceiveFormProps> = ({
	className,
	accessToken,
	refreshToken,
}) => {
	const isFetching = useIsFetching()
	const cookies = useCookies()

	const router = useRouter()

	const { mutate: postCodeMailMutate } = useCheckMailCode()
	const { mutate: refreshTokens } = useRefreshToken({ cookies })

	const [isSendingCode, setIsSendingCode] = useState(false)
	const [code, setCode] = useState<string[]>([])

	const sendCode = (values: string[]) => {
		if (code == values) {
			return
		}

		setCode(values)
		postCodeMailMutate(
			{ values },
			{
				onSuccess(data) {
					if (data) {
						refreshTokens()
						router.push('/')
					}
					setIsSendingCode(false)
				},
				onError(error) {
					setIsSendingCode(false)
					console.log('Error when postCode' + error)
				},
			}
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.pinInput_container}>
				<StatefulPinInput
					initialValue={[]}
					type='number'
					validate={/^\d$/}
					length={4}
					onComplete={sendCode}
					size='md'
					inputClassName={styles.pinInput}
					disabled={!!isFetching || isSendingCode}
				/>
			</div>
		</div>
	)
}

export default MailReceiveForm
