import React from 'react';
import { cookies } from 'next/headers';

import Navbar from './Navbar';
import Player from './Player';

import spotifyService from '@/services/spotify';

const Layout = async ({ children }) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token').value;
	const user = await spotifyService.fetchCurrentUser(accessToken);

	return (
		<div className="flex flex-col max-h-full h-full">
			<div className="h-14">
				<Navbar accessToken={accessToken} user={user} />
			</div>
			<div className="md:p-0 md:mx-4 pb-40 flex-1 overflow-hidden">
				{children}
			</div>
			<div className="fixed bottom-0 md:relative w-full">
				<Player accessToken={accessToken} />
			</div>
		</div>
	);
};

export default Layout;
