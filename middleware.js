import { NextResponse } from 'next/server';
import axios from 'axios';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(request) {
	const { cookies } = request;
	try {
		const accessToken = cookies?.get('access_token')?.value;
		const refreshToken = cookies?.get('refresh_token')?.value;

		if (!accessToken && !refreshToken) {
			return NextResponse.redirect(new URL('/login', request.url));
		}

		if (accessToken) {
			const response = await axios.get('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.ok) {
				return NextResponse.next();
			}
		}

		if (refreshToken) {
			const refreshResponse = await axios.post(
				`${NEXT_PUBLIC_API_URL}/api/refresh-token`,
				{ refresh_token: refreshToken },
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			if (refreshResponse.status === 200) {
				const { access_token: newAccessToken, expires_in: expiresIn } =
					refreshResponse.data;

				const response = NextResponse.next();
				response.cookies.set('access_token', newAccessToken, {
					httpOnly: true,
					maxAge: expiresIn,
					path: '/',
				});
				return response;
			}
		}
	} catch (error) {
		console.error('[middleware] An error occurred:', error.message);
	}
	return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
	matcher: [
		'/',
		'/profile/:path*',
		'/browse/:path*',
		'/library/:path*',
		'/album/:path*',
		'/artist/:path*',
		'/playlist/:path*',
	],
};
