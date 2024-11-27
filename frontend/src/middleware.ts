'use server'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import * as jwt from '@/actions/jwt'

const restrictedRoutes = ['/', '/account', '/login/mailCode']

export function middleware(request: NextRequest) {
	const route = request.nextUrl.pathname

	if (restrictedRoutes.includes(route)) {
		if (!checkTokens(request)) {
			return NextResponse.redirect(new URL('/login', request.nextUrl))
		}
	}
	return NextResponse.next()
}

const checkTokens = (request: NextRequest): boolean => {
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) return false

	const tokenVerifyResult = jwt.verifyAccessToken(accessToken)

	if (!tokenVerifyResult) {
		return false
	}

	return true
}
