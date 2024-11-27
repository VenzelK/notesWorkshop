import { RefObject, useEffect, useRef } from 'react'

type Callback = (event: MouseEvent) => void

const useOuterClick = <T extends HTMLElement>(
	callback: Callback
): RefObject<T> => {
	const innerRef = useRef<T>(null)
	const callbackRef = useRef<Callback | null>(null)

	useEffect(() => {
		callbackRef.current = callback
	})

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				innerRef.current &&
				callbackRef.current &&
				!innerRef.current.contains(e.target as Node)
			) {
				callbackRef.current(e)
			}
		}

		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [])

	return innerRef
}

export default useOuterClick
