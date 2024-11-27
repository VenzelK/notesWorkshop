'use client'

import useCreateNote from '@/hooks/query/useCreateNote'
import useDeleteNote from '@/hooks/query/useDeleteNote'
import useUpdateNote from '@/hooks/query/useUpdateNote'
import { ModalContext } from '@/providers/ModalProvider'
import { CreateNote } from '@/types/notes.types'
import { useContext, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegTrashCan } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import Tag from '../tag/Tag'

interface ModalProps {}
interface CreateNoteFields extends Omit<CreateNote, 'tags'> {
	tags: string
}

const Modal: React.FC<ModalProps> = () => {
	const { modalData, modalMode, setModalMode, isOpen, closeModal } =
		useContext(ModalContext) || {}

	const { mutate: updateNoteMutate } = useUpdateNote()
	const { mutate: deleteNoteMutate } = useDeleteNote()
	const { mutate: createNoteMutate } = useCreateNote()

	const {
		register,
		handleSubmit,
		clearErrors,
		setValue,
		formState: { errors },
	} = useForm<CreateNoteFields>()

	useEffect(() => {
		setValue('name', modalData?.name || '')
		setValue('text', modalData?.text || '')
		setValue('tags', modalData?.tags.join(' ') || '')
	}, [modalData, setValue])

	const submitNote = handleSubmit((data, event) => {
		const eventType = (event?.nativeEvent as SubmitEvent).submitter?.id

		const noteId = modalData?.id.toString() || ''

		if (eventType == 'deleteBtn') {
			deleteNoteMutate({ id: noteId })
		}

		const noteData: CreateNote = {
			...data,
			tags: data.tags.toString().split(/\s+/),
		}

		if (eventType == 'updateBtn') {
			updateNoteMutate({ data: noteData, id: noteId })
		}

		if (eventType == 'createBtn') {
			createNoteMutate({ data: noteData })
		}

		clearErrors()
		if (closeModal) closeModal()
	})

	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				if (closeModal) closeModal()
			}
		}

		if (isOpen) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isOpen, closeModal])

	if (!isOpen) {
		return null
	}

	const handleEditClick = () => {
		if (setModalMode) setModalMode('edit')
	}

	const updatedDate = new Date(
		modalData?.updatedDate || ''
	).toLocaleDateString()

	const createdDate = new Date(
		modalData?.updatedDate || ''
	).toLocaleDateString()

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 backdrop-blur-md '>
			<div
				className=' sticky top-[10%] left-[30%] w-1/2 max-sm:w-11/12 max-sm:left-[5%] max-sm:absolute'
				ref={modalRef}
			>
				<form className='flex flex-col gap-2 w-full' onSubmit={submitNote}>
					{/* HEADER PANEl */}
					<div className='flex flex-col border-2 border-black rounded-menu_radius  gap-5 relative bg-bg_color px-5 pt-1 pb-8'>
						{modalMode == 'edit' && (
							<input
								{...register('name', {
									required: true,
									value: modalData?.name,
									maxLength: 16,
								})}
								className={`text-[32px] text-center bg-menu_color rounded-menu_radius ${
									errors.name && ' border-b-2 border-red'
								}`}
								type='text'
							></input>
						)}
						{modalMode == 'view' && (
							<div className='text-[32px] text-center'>{modalData?.name}</div>
						)}

						{modalData?.canEdit && modalMode == 'view' && (
							<div className='absolute right-10 top-2'>
								<button onClick={handleEditClick}>
									<MdEdit size={30} />
								</button>
							</div>
						)}
						{modalMode == 'edit' && (
							<div className='absolute right-10 top-3'>
								<button onClick={handleEditClick} type='submit' id='deleteBtn'>
									<FaRegTrashCan size={30} className=' text-red' />
								</button>
							</div>
						)}

						{modalMode == 'view' && (
							<>
								<div className='flex flex-row justify-between items-center w-full gap-10 max-md:flex-col'>
									<div className='flex flex-row justify-between w-1/2 max-md:w-full'>
										<div>Автор</div>
										<div className='flex flex-row gap-2'>
											<div>{modalData?.authorEmail}</div>
											<RxAvatar size={20} />
										</div>
									</div>
									<div className='flex flex-row justify-between w-1/2 max-md:w-full'>
										<div>Дата изменения</div>
										<div className='flex flex-row gap-5'>
											<div>{updatedDate}</div>
										</div>
									</div>
								</div>
								<div className='flex flex-row justify-between items-center w-full gap-10 '>
									<div className='flex flex-row justify-between w-1/2 max-md:w-full'>
										<div>Дата создания</div>
										<div className='flex flex-row gap-5'>
											<div>{createdDate}</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
					{/* MAIN PANEl */}
					<div className='border-2 border-black rounded-menu_radius bg-bg_color overflow:scroll'>
						<div className='flex flex-col py-5 px-4 gap-5 relative'>
							{modalMode == 'view' && (
								<div className='text-wrap overflow-scroll break-words'>
									{modalData?.text}
								</div>
							)}
							{modalMode == 'edit' && (
								<textarea
									wrap='hard'
									rows={20}
									className={` bg-menu_color rounded-menu_radius text-wrap resize-none p-2 focus:outline-none overflow-scroll ${
										errors.text && ' border-b-2 border-red'
									}`}
									{...register('text', {
										required: true,
										maxLength: 1200,
										value: modalData?.text,
									})}
								></textarea>
							)}

							<div className='border-[1px] border-black w-full'></div>
							<div className='flex flex-col gap-4'>
								<div className='text-[20px] font-semibold'>Теги:</div>
								{modalMode == 'view' && (
									<div className='flex flex-row gap-5 flex-wrap'>
										{modalData?.tags.map((tag, index) => {
											return <Tag key={index} tag={tag} />
										})}
									</div>
								)}
								{modalMode == 'edit' && (
									<textarea
										wrap='hard'
										rows={2}
										{...register('tags', {
											required: true,
											value: modalData?.tags.join(' '),
											maxLength: 100,
										})}
										className={`bg-menu_color rounded-menu_radius text-wrap resize-none p-2 focus:outline-none ${
											errors.tags && ' border-b-2 border-red'
										}`}
									/>
								)}
								{modalMode == 'edit' && modalData && (
									<button
										className='px-6 py-2 rounded-menu_radius bg-green'
										type='submit'
										id='updateBtn'
									>
										Изменить
									</button>
								)}
								{modalMode == 'edit' && !modalData && (
									<button
										className='px-6 py-2 rounded-menu_radius bg-green'
										type='submit'
										id='createBtn'
									>
										Создать
									</button>
								)}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Modal
