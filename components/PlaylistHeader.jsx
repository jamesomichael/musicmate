import React from 'react';

import useUserStore from '@/stores/userStore';

const PlaylistHeader = ({ size, name, imageUrl }) => {
	const { displayName } = useUserStore();

	return (
		<div className="bg-gradient-to-b from-indigo-800 to-indigo-950 p-6 h-72 grid grid-cols-[auto_1fr] gap-6">
			<div
				className="h-full aspect-square bg-cover bg-center rounded"
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div className="flex flex-col justify-end gap-4">
				<span className="font-copy text-xs">Playlist</span>
				<span className="font-heading text-6xl font-black">{name}</span>
				<div className="flex gap-4 text-sm font-copy">
					<span className="font-medium">{displayName}</span>
					{size && (
						<span className="text-gray-300">{size} songs</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlaylistHeader;
