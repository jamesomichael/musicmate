import React from 'react';

const LibraryPanelListItem = ({ imageUrl, primaryText, secondaryText }) => {
	return (
		<div className="hover:bg-neutral-800 hover:cursor-pointer rounded min-h-10 grid grid-cols-[auto_1fr] gap-2 items-center p-2">
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
				<span className="font-heading text-sm text-gray-200 line-clamp-1">
					{primaryText}
				</span>
				<span className="text-xs font-copy text-gray-300 line-clamp-1">
					{secondaryText}
				</span>
			</div>
		</div>
	);
};

export default LibraryPanelListItem;
