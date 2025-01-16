import '../globals.css';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
// import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Player from '@/components/Player';
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
			<body className="antialiased overflow-auto min-h-screen h-screen w-full bg-black">
				<div className="flex flex-col max-h-full h-full">
					{accessToken && user && (
						<div className="h-14">
							<Navbar accessToken={accessToken} user={user} />
						</div>
					)}
					<div className="md:p-0 md:mx-4 pb-40 flex-1 overflow-auto">
						<div className="grid grid-cols-[auto_1fr] h-full gap-4">
							<div className="bg-spotify-black overflow-y-scroll h-full w-80 rounded p-8">
								LibraryPanel
							</div>
							<div className="bg-spotify-black text-gray-300 text-6xl overflow-y-scroll h-full rounded font-gloock p-8">
								{children}
							</div>
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
