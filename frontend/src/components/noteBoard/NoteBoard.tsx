'use client'

import useFetchNotes from '@/hooks/query/useFetchNotes'
import useRefreshToken from '@/hooks/query/useRefreshToken'
import { Role } from '@/types/store.types'
import { useCookies } from 'next-client-cookies'
import { useState } from 'react'
import Note from '../note/Note'

import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import PageScroller from '../pageScroller/PageScroller'
import styles from './NoteBoard.module.css'

interface NoteBoardProps {
	userRole: Role
	userId: number
	redirectToLogin: () => void
}

const NoteBoard: React.FC<NoteBoardProps> = ({
	userId,
	userRole,
	redirectToLogin,
}) => {
	const [page, setPage] = useState<number>(1)

	const [loginErrorCount, setloginErrorCount] = useState(0)

	const cookies = useCookies()

	const checkNoteAccess = (authorId: number) => {
		return authorId == userId || userRole == Role.Admin
	}

	const { mutate: refreshTokens } = useRefreshToken({
		cookies,
	})

	const {
		data: notes,
		refetch: refetchNotes,
		error: notesError,
		isLoading: notesIsloading,
	} = useFetchNotes({
		page: page,
	})

	if (notesError?.message == 'login error' && loginErrorCount < 2) {
		try {
			refreshTokens()
			refetchNotes()
			setloginErrorCount(prev => ++prev)
		} catch (error) {
			console.log(error)
			redirectToLogin()
		}
	}

	const checkNextPage = () => {
		if (notes?.result.length == notes?.limit) {
			return true
		}
		return false
	}

	return (
		<div className={styles.container}>
			{notesIsloading ? (
				<AiOutlineLoading3Quarters
					className=' animate-spin text-green mx-auto self-center'
					size={140}
				/>
			) : (
				<>
					<div>{notesError?.message}</div>
					{(notes?.result.length as number) > 0 && (
						<div className='self-end'>
							<PageScroller
								page={page}
								setPage={setPage}
								checkNextPage={checkNextPage}
								size={20}
							/>
						</div>
					)}
					<div className={styles.notes_container}>
						{notes &&
							notes?.result.map(note => {
								return (
									<Note
										id={note.id}
										key={note.id}
										authorEmail={note.authorEmail}
										checkUserAccess={checkNoteAccess}
										name={note.name}
										text={note.text}
										authorId={note.userId}
										tags={note.tags}
										createdDate={note.createdDate}
										updatedDate={note.updatedDate}
									/>
								)
							})}
					</div>
					{(notes?.result.length as number) > 10 && (
						<div className='self-end'>
							<PageScroller
								page={page}
								setPage={setPage}
								checkNextPage={checkNextPage}
								size={20}
							/>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default NoteBoard
