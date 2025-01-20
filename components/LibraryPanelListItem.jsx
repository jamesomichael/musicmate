import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { BsFillPinAngleFill } from 'react-icons/bs';

const LibraryPanelListItem = ({
	href = '/',
	imageUrl,
	primaryText,
	secondaryText,
	isPinnedItem = false,
}) => {
	const pathname = usePathname();
	return (
		<Link
			href={href}
			className={`hover:cursor-pointer rounded min-h-10 grid grid-cols-[auto_1fr] gap-2 items-center p-2 ${
				href === pathname
					? 'bg-neutral-700 hover:bg-neutral-600'
					: 'hover:bg-neutral-800'
			}`}
		>
			{imageUrl ? (
				<div
					className="rounded bg-center bg-cover h-12 aspect-square"
					style={{
						backgroundImage: `url(${imageUrl})`,
					}}
				></div>
			) : (
				<div>No image</div>
			)}
			<div className="flex flex-col gap-0.5 justify-center items-start">
				<div className="flex gap-1 items-center">
					{isPinnedItem && (
						<span className="font-copy text-spotify-green">
							<BsFillPinAngleFill />
						</span>
					)}
					<span className="font-heading text-sm text-gray-200 line-clamp-1">
						{primaryText}
					</span>
				</div>
				{secondaryText && (
					<span className="text-xs font-copy text-gray-300 line-clamp-1">
						{secondaryText}
					</span>
				)}
			</div>
		</Link>
	);
};

export default LibraryPanelListItem;
