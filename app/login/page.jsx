import React from 'react';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import Link from 'next/link';

import { SPOTIFY_SCOPES } from '@/constants/auth';

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const SPOTIFY_AUTH_URL = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL;

const authUrl = `${SPOTIFY_AUTH_URL}?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
	SPOTIFY_REDIRECT_URI
)}&scope=${encodeURIComponent(SPOTIFY_SCOPES.join(' '))}`;

const Login = () => {
	return (
		<>
			<div className="min-h-screen select-none bg-spotify-black flex-1 flex items-center pl-8 relative">
				<div
					className="absolute inset-0 grayscale bg-cover bg-center opacity-40"
					style={{
						backgroundImage:
							'url(https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
					}}
				></div>
				<span className="absolute bottom-4 right-4 text-xs font-heading text-gray-400 z-10 opacity-40">
					Photo by&nbsp;
					<Link
						href="https://unsplash.com/@shmabbss?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						target="_blank"
						className="hover:text-spotify-green"
					>
						Abigail Lynn
					</Link>
				</span>
				<div className="absolute inset-0 bg-black opacity-60"></div>

				<div className="relative z-10 flex flex-col gap-4 h-full justify-center items-start">
					<Logo className="text-4xl sm:text-5xl" />
					<Link
						href={authUrl}
						className="hover:bg-opacity-80 bg-white font-copy font-medium text-sm px-10 py-3 text-black rounded"
					>
						Log in with Spotify
					</Link>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
