import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const GET = async (request) => {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');
	const cookieStore = await cookies();

	const response = await axios.post(
		'https://accounts.spotify.com/api/token',
		null,
		{
			params: {
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
				client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
				client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	);

	const { access_token, refresh_token, expires_in } = response.data;
	const tokenCookieOptions = [
		{
			name: 'access_token',
			value: access_token,
			httpOnly: true,
			path: '/',
			maxAge: expires_in,
		},
		{
			name: 'refresh_token',
			value: refresh_token,
			httpOnly: true,
			path: '/',
			maxAge: 30 * 24 * 60 * 60,
		},
	];

	tokenCookieOptions.forEach((cookieOptions) =>
		cookieStore.set(cookieOptions)
	);

	return NextResponse.redirect(new URL('/', request.url));
};

export { GET };
