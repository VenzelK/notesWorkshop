'use server'

import { AccessToken } from '@/types/store.types'
import * as jose from 'jose'

const accessTokenSecret = new TextEncoder().encode(
	process.env.JWT_ACCESS_SECRET
)

export const verifyAccessToken = async (accessToken: string) => {
	try {
		return await jose.jwtVerify<AccessToken>(accessToken, accessTokenSecret)
	} catch (error) {
		console.log({ error })
		return null
	}
}

export const decodeAccessToken = async (accessToken: string) => {
	try {
		return jose.decodeJwt<AccessToken>(accessToken)
	} catch (error) {
		console.log({ error })
		return null
	}
}
