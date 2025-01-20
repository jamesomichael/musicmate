import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { GoHomeFill, GoHome } from 'react-icons/go';

const HomeButton = () => {
	const pathname = usePathname();
	const isHomepage = pathname === '/';

	return (
		<Link
			href="/"
			title="Home"
			className="h-full aspect-square rounded-full bg-neutral-800 flex justify-center items-center text-gray-300 hover:scale-105 hover:cursor-pointer"
		>
			{isHomepage ? <GoHomeFill size={22} /> : <GoHome size={22} />}
		</Link>
	);
};

export default HomeButton;
