'use client';
import React, { useEffect } from 'react';

import useLibraryStore from '@/stores/libraryStore';
import useAuthStore from '@/stores/authStore';
import useUserStore from '@/stores/userStore';

const Songs = () => {
	const { accessToken } = useAuthStore();
	const { displayName } = useUserStore();
	const { isLoadingSongs, hasFetchedLikedSongs, likedSongs, setLikedSongs } =
		useLibraryStore();

	useEffect(() => {
		if (!hasFetchedLikedSongs && !isLoadingSongs && accessToken) {
			setLikedSongs(accessToken);
		}
	}, [setLikedSongs, accessToken, hasFetchedLikedSongs, isLoadingSongs]);

	return (
		<div className="select-none grid grid-rows-[auto,auto,1fr]">
			<div className="bg-gradient-to-b from-indigo-800 to-indigo-950 p-6 h-72 grid grid-cols-[auto_1fr] gap-6">
				<div
					className="h-full aspect-square bg-cover bg-center rounded"
					style={{ backgroundImage: 'url(/liked-songs-300.jpg)' }}
				></div>
				<div className="flex flex-col justify-end gap-4">
					<span className="font-copy text-xs">Playlist</span>
					<span className="font-heading text-6xl font-black">
						Liked Songs
					</span>
					<div className="flex gap-4 text-sm font-copy">
						<span className="font-medium">{displayName}</span>
						<span className="text-gray-300">
							{likedSongs.length} songs
						</span>
					</div>
				</div>
			</div>
			<div>Controls/Tags</div>
			<div>
				<div className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr] gap-4 font-copy text-gray-400 text-sm border-b border-neutral-800">
					<span>#</span>
					<span>Title</span>
					<span>Album</span>
					<span>Date added</span>
					<span>Duration</span>
				</div>

				{likedSongs.map(({ track, added_at: addedAt }, index) => {
					return (
						<div
							key={track.id}
							className="grid h-16 grid-cols-[1fr,2fr,1fr,1fr,1fr] gap-4 items-center hover:bg-red-600 rounded"
						>
							<span className="font-copy text-sm text-right">
								{index + 1}
							</span>
							<div className="flex flex-col">
								<span className="font-heading text-sm">
									{track.name}
								</span>
								<span className="font-copy text-xs">
									{track.artists[0].name}
								</span>
							</div>
							<span className="font-copy text-sm truncate">
								{track.album.name}
							</span>
							<span className="font-copy text-sm">{addedAt}</span>
							<span className="font-copy text-sm">
								{track.duration_ms}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Songs;
