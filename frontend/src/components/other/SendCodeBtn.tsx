'use client'

import usePostMail from '@/hooks/query/usePostMail'

interface SendCodeBtnProps {
	accessToken: string
}

const SendCodeBtn: React.FC<SendCodeBtnProps> = ({ accessToken }) => {
	const { mutate: postMailMutate } = usePostMail()

	const postMail = () => {
		postMailMutate({ accessToken })
	}

	return (
		<div className='underline cursor-pointer pr-5 pb-2' onClick={postMail}>
			Отправить код повторно
		</div>
	)
}

export default SendCodeBtn
