'use client';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { FaRegClock } from 'react-icons/fa6';

import useLibraryStore from '@/stores/libraryStore';
import useAuthStore from '@/stores/authStore';
import useUserStore from '@/stores/userStore';

dayjs.extend(duration);

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
			<div>{/* Controls/Tags */}</div>
			<div className="p-6">
				<div className="grid grid-cols-[3rem,2fr,1fr,1fr,5rem] py-1 gap-6 font-copy text-gray-400 text-sm border-b border-neutral-800 mb-4">
					<span className="text-right">#</span>
					<span>Title</span>
					<span>Album</span>
					<span className="flex">Date added</span>
					<div className="flex">
						<FaRegClock />
					</div>
				</div>

				{likedSongs.map(({ track, added_at: addedAt }, index) => {
					return (
						<div
							key={track.id}
							className="grid h-16 grid-cols-[3rem,2fr,1fr,1fr,5rem] gap-6 items-center hover:bg-neutral-800 rounded"
						>
							<span className="font-copy text-sm text-right text-gray-300">
								{index + 1}
							</span>
							<div className="flex h-full p-2 gap-2 justify-start items-center">
								<div
									className="bg-cover bg-center h-full aspect-square rounded"
									style={{
										backgroundImage: `url(${track.album.images[0]?.url})`,
									}}
								></div>
								<div className="flex flex-col">
									<span className="font-heading text-sm text-gray-200">
										{track.name}
									</span>
									<span className="font-copy text-xs text-gray-300">
										{track.artists[0].name}
									</span>
								</div>
							</div>
							<span className="font-copy text-sm text-gray-300 truncate">
								{track.album.name}
							</span>
							<span className="font-copy text-gray-300 text-sm">
								{dayjs().diff(dayjs(addedAt), 'weeks') > 4
									? dayjs(addedAt).format('D MMM YYYY')
									: dayjs().diff(dayjs(addedAt), 'weeks') >= 1
									? `${dayjs().diff(
											dayjs(addedAt),
											'weeks'
									  )} weeks ago`
									: dayjs(addedAt).fromNow()}
							</span>
							<span className="font-copy text-gray-300 text-sm">
								{dayjs
									.duration(track.duration_ms, 'milliseconds')
									.format('m:ss')}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Songs;
