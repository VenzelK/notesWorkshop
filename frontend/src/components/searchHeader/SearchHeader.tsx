'use client'

import { SortType } from '@/types/notes.types'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { IoReload } from 'react-icons/io5'
import DropDownMenu from '../dropDown/DropDownMenu'
import styles from './SearchHeader.module.css'

interface SearchHeaderProps {}

const SearchHeader: React.FC<SearchHeaderProps> = () => {
	const [sortType, setSortType] = useState<SortType>('date')

	const [sortTypeMenuOpened, setSortTypeMenuOpened] = useState(false)

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
	}

	return (
		<div className=''>
			<div className='relative'>
				<input
					type='text'
					placeholder='Поиск по тегам'
					className={styles.searchInput}
				/>
				<CiSearch className={styles.searchIcon} size={30} />
			</div>
			<div className='flex flex-row gap-10 justify-end mt-4 relative'>
				<div className={styles.sortBtn_container}>
					<button
						className={styles.btn + ' ' + styles.sortBtn}
						onClick={() => setSortTypeMenuOpened(prev => !prev)}
					>
						<span>{fieldTitles[sortType]}</span>
						<IoMdArrowDropdown
							size={30}
							className={sortTypeMenuOpened ? 'rotate-180' : ''}
						/>
					</button>

					{sortTypeMenuOpened && (
						<DropDownMenu<SortType>
							fields={fieldTitles}
							onChange={onSelectSortType}
							className={styles.dropDownMenu}
						/>
					)}
				</div>

				<div className='flex-1'></div>
				<button className={styles.btn + ' ' + styles.refreshBtn}>
					<IoReload size={30} />
				</button>
				<button className={styles.btn + ' ' + styles.addBtn}>
					<FaPlus size={30} />
				</button>
			</div>
		</div>
	)
}

export default SearchHeader
