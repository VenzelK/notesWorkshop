interface DropDownMenuProps<T extends string> {
	fields: Record<T, string>
	onChange: (value: T) => void
	className?: string
}

const DropDownMenu = <T extends string>({
	fields,
	onChange,
	className,
}: DropDownMenuProps<T>) => {
	return (
		<div className={className}>
			<div className='flex flex-col gap-2 text-nowrap'>
				{Object.keys(fields).map((field, index) => {
					return (
						<button
							className='bg-menu_color rounded-[5px] px-5 py-1'
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
