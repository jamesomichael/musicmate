import '../globals.css';
import React from 'react';
import { cookies } from 'next/headers';
import LibraryPanel from '@/components/library/LibraryPanel';
import Navbar from '@/components/navbar/Navbar';
import Player from '@/components/player/Player';
import spotifyService from '@/services/spotify';

export const metadata = {
	title: 'musicmate',
	description: 'musicmate',
};

export default async function Layout({ children }) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;

	let user;
	if (accessToken) {
		user = await spotifyService.fetchCurrentUser(accessToken);
	}

	return (
		<html lang="en">
			<body className="select-none antialiased overflow-auto min-h-screen h-screen w-full bg-black">
				<div className="flex flex-col max-h-full h-full">
					{accessToken && user && (
						<div className="h-14">
							<Navbar accessToken={accessToken} user={user} />
						</div>
					)}
					<div className="md:p-0 md:mx-2 md:mb-2 flex-1 overflow-hidden">
						<div className="grid grid-cols-[auto_1fr] h-full gap-0 md:gap-2">
							<div className="hidden md:block bg-spotify-black overflow-hidden h-full w-80 rounded p-2">
								<LibraryPanel accessToken={accessToken} />
							</div>
							<div className="bg-spotify-black overflow-y-scroll h-full rounded">
								{children}
							</div>
							{/* <div className="bg-spotify-black overflow-y-scroll h-full w-80 rounded p-8">
								SocialPanel
							</div> */}
						</div>
					</div>
					{accessToken && (
						<div className="fixed bottom-0 md:relative w-full">
							<Player accessToken={accessToken} />
						</div>
					)}
				</div>
			</body>
		</html>
	);
}
