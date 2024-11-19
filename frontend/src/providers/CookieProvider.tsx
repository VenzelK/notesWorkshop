import { CookiesProvider } from 'next-client-cookies/server'

interface CookieProviderProps {
	children: React.ReactNode
}

const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
	return <CookiesProvider>{children}</CookiesProvider>
}
export default CookieProvider
