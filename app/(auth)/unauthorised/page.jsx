import React from 'react';

import Logo from '@/components/Logo';
import Link from 'next/link';

const Unauthorised = () => {
	return (
		<div className="relative flex justify-center items-center h-full bg-spotify-black">
			<div
				className="absolute inset-0 grayscale bg-cover bg-bottom opacity-40"
				style={{
					backgroundImage: `url(https://images.unsplash.com/photo-1488036106564-87ecb155bb15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
				}}
			></div>
			<div className="absolute inset-0 bg-black opacity-20"></div>
			<div className="relative flex justify-center items-center bg-black px-10 py-8">
				<div className="text-center flex flex-col items-center gap-3">
					<Logo className="text-lg sm:text-xl lg:text-2xl leading-none" />
					<span className="py-1 font-heading font-bold text-xl sm:text-2xl text-white">
						Thanks for your interest!
					</span>
					<span className="font-copy text-sm text-gray-200">
						Unfortunately, you are not currently authorised to
						access musicmate.
					</span>
					<span className="font-copy text-sm text-gray-200">
						Please&nbsp;
						<Link
							href="mailto:musicmate@jamesmichael.dev?subject=Access%20Request"
							className="text-spotify-green hover:underline"
						>
							get in touch
						</Link>
						&nbsp;to request access.
					</span>
				</div>
			</div>
		</div>
	);
};

export default Unauthorised;
