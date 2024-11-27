'use client'

import useSearchMutation from '@/hooks/query/useSearchMutation'
import { ModalContext } from '@/providers/ModalProvider'
import { SortType } from '@/types/notes.types'
import { useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { IoReload } from 'react-icons/io5'
import DropDownMenu from '../dropDown/DropDownMenu'
import styles from './SearchHeader.module.css'

interface SearchHeaderProps {}

const SearchHeader: React.FC<SearchHeaderProps> = () => {
	const queryClient = useQueryClient()

	const modalContext = useContext(ModalContext)

	const [sortType, setSortType] = useState<SortType>('date')

	const [searchTerm, setSearchTerm] = useState('')

	const [sortTypeMenuOpened, setSortTypeMenuOpened] = useState(false)

	const { mutate: searchDataMutate } = useSearchMutation()

	const fieldTitles: {
		[K in SortType]: string
	} = {
		author: 'По автору',
		date: 'По дате',
		my: 'Только мои',
		name: 'По имени',
	}

	const onSelectSortType = (value: SortType) => {
		setSortType(value)

		setSortTypeMenuOpened(false)
		searchDataMutate({ searchTagsString: searchTerm, sortType: value })
	}

	const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code == 'Enter') {
			searchDataMutate({ searchTagsString: searchTerm, sortType })
			queryClient.invalidateQueries({ queryKey: ['notes'], exact: true })
		}
	}

	const handleUpdate = () => {
		queryClient.invalidateQueries({
			queryKey: ['notes'],
		})
	}

	const handleCreate = () => {
		modalContext?.setModalData(null)
		modalContext?.setModalMode('edit')
		modalContext?.openModal()
	}

	return (
		<div className={styles.container}>
			<div className='relative'>
				<input
					type='text'
					placeholder='Поиск по тегам'
					className={styles.searchInput}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					onKeyDown={handleSearch}
				/>
				<CiSearch className={styles.searchIcon} />
			</div>
			<div className={styles.btn_container}>
				<div className={styles.sortBtn_container}>
					<button
						className={styles.btn + ' ' + styles.sortBtn}
						onClick={() => setSortTypeMenuOpened(prev => !prev)}
					>
						<span>{fieldTitles[sortType]}</span>
						<IoMdArrowDropdown
							className={
								sortTypeMenuOpened
									? 'rotate-180'
									: '' + ' ' + styles.dropDownIcon
							}
						/>
					</button>

					{sortTypeMenuOpened && (
						<DropDownMenu<SortType>
							close={() => setSortTypeMenuOpened(false)}
							fields={fieldTitles}
							onChange={onSelectSortType}
							className={styles.dropDownMenu}
						/>
					)}
				</div>

				<div className='flex-1'></div>
				<button
					className={styles.btn + ' ' + styles.refreshBtn}
					onClick={handleUpdate}
				>
					<IoReload size={30} />
				</button>
				<button
					className={styles.btn + ' ' + styles.addBtn}
					onClick={handleCreate}
				>
					<FaPlus size={30} />
				</button>
			</div>
		</div>
	)
}

export default SearchHeader
