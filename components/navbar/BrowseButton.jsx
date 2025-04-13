import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { BiSolidCategory, BiCategory } from 'react-icons/bi';

const BrowseButton = () => {
	const pathname = usePathname();
	const isBrowsePage = pathname === '/browse';

	return (
		<Link
			href="/browse"
			title="Browse"
			className="h-full aspect-square rounded-full bg-neutral-800 flex justify-center items-center text-gray-300 hover:scale-105 hover:cursor-pointer"
		>
			{isBrowsePage ? (
				<BiSolidCategory size={22} />
			) : (
				<BiCategory size={22} />
			)}
		</Link>
	);
};

export default BrowseButton;
