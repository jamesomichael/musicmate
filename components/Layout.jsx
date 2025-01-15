import React from 'react';

import { cookies } from 'next/headers';

import Navbar from './Navbar';
import Player from './Player';

const Layout = async ({ children }) => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token').value;

	return (
		<div className="flex flex-col max-h-full h-full">
			<div className="h-14">
				<Navbar accessToken={accessToken} />
			</div>
			<div className="md:p-0 md:m-4 pb-40 flex-1 bg-yellow-300 overflow-hidden">
				{children}
			</div>
			<div className="h-16 bg-red-300 fixed bottom-0 md:relative w-full">
				<Player accessToken={accessToken} />
			</div>
		</div>
	);
};

export default Layout;
