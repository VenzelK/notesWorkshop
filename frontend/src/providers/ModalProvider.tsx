'use client'

import { ModalMode, ModalNote } from '@/types/notes.types'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Updater, useImmer } from 'use-immer'

interface ModalProviderProps {
	children: React.ReactNode
}

interface ModalContextProps {
	isOpen: boolean
	openModal: () => void
	closeModal: () => void
	setModalData: Updater<ModalNote | null>
	modalData: ModalNote | undefined | null
	setModalMode: Dispatch<SetStateAction<ModalMode>>
	modalMode: ModalMode
}

export const ModalContext = createContext<ModalContextProps | undefined>(
	undefined
)

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	const [modalData, setModalData] = useImmer<ModalNote | null>(null)

	const [modalMode, setModalMode] = useState<ModalMode>('view')

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setModalData(null)
		setModalMode('view')
		setIsOpen(false)
	}

	return (
		<ModalContext.Provider
			value={{
				isOpen,
				modalData,
				setModalData,
				closeModal,
				openModal,
				modalMode,
				setModalMode,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}

export default ModalProvider
