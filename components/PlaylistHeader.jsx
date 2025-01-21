import React from 'react';

const PlaylistHeader = ({ size, name, imageUrl, owner }) => {
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
					<span className="font-medium">{owner.display_name}</span>
					{size && (
						<span className="text-gray-300">{size} songs</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlaylistHeader;
