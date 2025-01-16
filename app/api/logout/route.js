import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const POST = async () => {
	const cookieStore = await cookies();

	cookieStore.delete('access_token');
	cookieStore.delete('refresh_token');

	return NextResponse.json({ success: true });
};

export { POST };
