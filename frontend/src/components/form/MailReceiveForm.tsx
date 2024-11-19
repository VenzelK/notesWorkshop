'use client'
import useCheckMailCode from '@/hooks/query/useCheckMailCode'
import usePostMail from '@/hooks/query/usePostMail'
import { useIsFetching } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { StatefulPinInput } from 'react-input-pin-code'
import styles from './MailReceiverForm.module.css'
interface MailReceiveFormProps {
	className?: string
	accessToken: string
}

const MailReceiveForm: React.FC<MailReceiveFormProps> = ({
	className,
	accessToken,
}) => {
	const isFetching = useIsFetching()

	const router = useRouter()

	const { mutate: postMailMutate } = usePostMail()
	const { mutate: postCodeMailMutate } = useCheckMailCode()

	const [isSendingCode, setIsSendingCode] = useState(false)
	const [code, setCode] = useState<string[]>([])

	useEffect(() => {
		postMailMutate({ accessToken })
	}, [])

	const sendCode = (values: string[]) => {
		if (code == values) {
			return
		}

		setCode(values)
		postCodeMailMutate(
			{ values, accessToken },
			{
				onSuccess(data, variables, context) {
					if (data) {
						router.push('/')
					}
					setIsSendingCode(false)
				},
				onError() {
					setIsSendingCode(false)
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
