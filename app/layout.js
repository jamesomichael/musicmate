import './globals.css';
import { cookies } from 'next/headers';
import Navbar from '@/components/Navbar';
import Player from '@/components/Player';

import spotifyService from '@/services/spotify';

export const metadata = {
	title: 'musicmate',
	description: 'musicmate',
};

export default async function RootLayout({ children }) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;

	let user;
	if (accessToken) {
		user = await spotifyService.fetchCurrentUser(accessToken);
	}

	return (
		<html lang="en">
			<body
				className={
					'antialiased overflow-auto min-h-screen h-screen w-full'
				}
			>
				<div className="flex flex-col max-h-full h-full">
					{accessToken && user && (
						<div className="h-14">
							<Navbar accessToken={accessToken} user={user} />
						</div>
					)}
					<div className="md:p-0 md:m-2 pb-40 flex-1 overflow-auto">
						{children}
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
