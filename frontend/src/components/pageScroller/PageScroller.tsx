import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

interface PageScrollerProps {
	page: number
	size: number
	setPage: (page: number) => void
	checkNextPage: () => boolean
}

const PageScroller: React.FC<PageScrollerProps> = ({
	page,
	size,
	setPage,
	checkNextPage,
}) => {
	return (
		<div className='flex flex-row gap-2 items-center'>
			{page > 1 && (
				<button onClick={() => setPage(--page)}>
					<IoChevronBack size={size} />
				</button>
			)}
			<div className={`text-green_disabled text-[${size}px]`}>{page}</div>
			{checkNextPage() && (
				<button onClick={() => setPage(++page)}>
					<IoChevronForward size={size} />
				</button>
			)}
		</div>
	)
}

export default PageScroller
