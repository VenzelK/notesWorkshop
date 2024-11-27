import useOuterClick from '@/hooks/useOuterClick'
import styles from './DropDown.module.css'

interface DropDownMenuProps<T extends string> {
	fields: Record<T, string>
	onChange: (value: T) => void
	className?: string
	close: () => void
}

const DropDownMenu = <T extends string>({
	fields,
	onChange,
	className,
	close,
}: DropDownMenuProps<T>) => {
	const innerRef = useOuterClick<HTMLDivElement>(e => {
		close()
	})

	return (
		<div className={className + ' ' + 'z-50'} ref={innerRef}>
			<div className={styles.container}>
				{Object.keys(fields).map((field, index) => {
					return (
						<button
							className={styles.btn}
							key={index}
							onClick={() => onChange(field as T)}
						>
							{fields[field as T]}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default DropDownMenu
