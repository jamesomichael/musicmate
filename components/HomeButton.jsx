import React from 'react';
import Link from 'next/link';

import { GrHomeRounded } from 'react-icons/gr';

const HomeButton = () => {
	return (
		<Link
			href="/"
			className="h-full aspect-square rounded-full bg-neutral-800 flex justify-center items-center text-gray-300 hover:scale-105 hover:cursor-pointer"
		>
			<GrHomeRounded size={18} />
		</Link>
	);
};

export default HomeButton;
