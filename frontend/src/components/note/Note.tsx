'use client'

import { ModalContext } from '@/providers/ModalProvider'
import { useContext } from 'react'
import Tag from '../tag/Tag'

import styles from './Note.module.css'

interface NoteProps {
	id: number
	name: string
	authorId: number
	authorEmail: string
	text: string
	checkUserAccess: (authorId: number) => boolean
	tags: string[]
	createdDate: string
	updatedDate: string
}

const Note: React.FC<NoteProps> = ({
	id,
	name,
	authorId,
	authorEmail,
	text,
	checkUserAccess,
	tags,
	createdDate,
	updatedDate,
}) => {
	const context = useContext(ModalContext)

	const handleClick = () => {
		context?.setModalData({
			id,
			name,
			authorEmail,
			createdDate,
			updatedDate,
			text,
			tags,
			userId: authorId,
			canEdit: checkUserAccess(authorId),
		})

		context?.openModal()
	}

	const formatedText = text.substring(0, 120)

	return (
		<div className={styles.container}>
			<div className={styles.note_container} onClick={handleClick}>
				<div className={styles.header}>
					<div className={styles.header_name}>{name}</div>
				</div>
				<div className={styles.text}>{formatedText}</div>
				<div className={styles.tags}>
					{tags.map((tag, index) => {
						if (index < 4) return <Tag key={index} tag={tag} />
					})}
				</div>
			</div>
		</div>
	)
}

export default Note
