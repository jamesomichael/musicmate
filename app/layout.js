import { Geist, Geist_Mono } from 'next/font/google';

// import Footer from '@/components/Footer';
// import NowPlaying from '@/components/NowPlaying';

import './globals.css';

export const metadata = {
	title: 'musicmate',
	description: 'musicmate',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={
					'antialiased overflow-auto min-h-screen flex flex-col gap-2 w-full'
				}
			>
				{/* <div className="min-h-screen flex flex-col gap-2 w-full"> */}
				{children}
				{/* </div> */}
				{/* <Footer /> */}
			</body>
		</html>
	);
}
