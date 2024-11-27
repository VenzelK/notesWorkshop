interface TagProps {
	tag: string
}

const Tag: React.FC<TagProps> = ({ tag }) => {
	return (
		<div className=' rounded-menu_radius border-2 border-green text-sm px-2 py-1'>
			{tag}
		</div>
	)
}

export default Tag
