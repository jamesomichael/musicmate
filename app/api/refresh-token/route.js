import { NextResponse } from 'next/server';
import axios from 'axios';

const NEXT_PUBLIC_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const NEXT_PUBLIC_CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

const POST = async (request) => {
	const { refresh_token } = await request.json();

	if (!refresh_token) {
		return NextResponse.json(
			{ error: 'Refresh token not provided.' },
			{ status: 400 }
		);
	}

	try {
		const response = await axios.post(
			'https://accounts.spotify.com/api/token',
			new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token,
			}).toString(),
			{
				headers: {
					Authorization: `Basic ${Buffer.from(
						`${NEXT_PUBLIC_CLIENT_ID}:${NEXT_PUBLIC_CLIENT_SECRET}`
					).toString('base64')}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		);

		const data = response.data;
		return NextResponse.json({ ...data });
	} catch (error) {
		console.error('Error refreshing token:', error);
		return NextResponse.json(
			{ error: 'Failed to refresh token.' },
			{ status: 500 }
		);
	}
};

module.exports = { POST };
