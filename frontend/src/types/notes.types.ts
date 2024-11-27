export type SortType = 'date' | 'author' | 'my' | 'name'

export interface Note {
	id: number
	userId: number
	authorEmail: string
	name: string
	text: string
	tags: string[]
	createdDate: string
	updatedDate: string
}

export interface StoreNotesData {
	result: Note[]
	limit: number
	page: number
	sortBy: SortType
	tags: string[]
}

export type ModalMode = 'edit' | 'view'

export interface ModalNote extends Note {
	canEdit: boolean
}

export interface CreateNote {
	name: string
	text: string
	tags: string[]
}
