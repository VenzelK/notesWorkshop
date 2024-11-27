import { HTMLInputTypeAttribute } from 'react'

interface InputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	type: HTMLInputTypeAttribute
	className?: string
	maxLength?: number
}

const Input: React.FC<InputProps> = props => {
	return (
		<input
			{...props}
			type={props.type}
			maxLength={props.maxLength}
			className={'border-b-2 border-black text-left' + ' ' + props.className}
		/>
	)
}

export default Input
