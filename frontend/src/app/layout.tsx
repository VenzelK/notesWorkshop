import CookieProvider from '../providers/CookieProvider'
import TanStackProvider from '../providers/TanStackProvider'
import './globals.css'
import './reset.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className + ' ' + 'text-text_color'}>
				<CookieProvider>
					<TanStackProvider>
						<div className='m-auto max-w-7xl min-h-screen'>{children}</div>
					</TanStackProvider>
				</CookieProvider>
			</body>
		</html>
	)
}
