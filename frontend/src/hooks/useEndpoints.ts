import { useQuery } from '@tanstack/react-query'
import { StoreEndpoints } from '../types/store.types'

const useEndpoints = () => {
	return useQuery<StoreEndpoints>(['endpoints'])
}

export default useEndpoints
