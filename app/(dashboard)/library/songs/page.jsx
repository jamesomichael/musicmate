'use client';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { FaPlay } from 'react-icons/fa6';

import Loader from '@/components/shared/Loader';
import PlaylistHeader from '@/components/PlaylistHeader';
import PlaylistContents from '@/components/PlaylistContents';

import useLibraryStore from '@/stores/libraryStore';
import useAuthStore from '@/stores/authStore';
import useUserStore from '@/stores/userStore';

dayjs.extend(duration);

const Songs = () => {
	const { accessToken } = useAuthStore();
	const { displayName, uri: userUri } = useUserStore();
	const { isLoadingSongs, hasFetchedLikedSongs, likedSongs, setLikedSongs } =
		useLibraryStore();

	useEffect(() => {
		if (!hasFetchedLikedSongs && !isLoadingSongs && accessToken) {
			setLikedSongs(accessToken);
		}
	}, [setLikedSongs, accessToken, hasFetchedLikedSongs, isLoadingSongs]);

	const playlist = {
		metadata: {
			name: 'Liked Songs',
			uri: `${userUri}:collection`,
			imageUrl: '/liked-songs-300.jpg',
			size: hasFetchedLikedSongs ? likedSongs.length : null,
			owner: {
				display_name: displayName,
			},
		},
		tracks: likedSongs,
	};

	return (
		<div className="grid grid-rows-[auto,1fr] h-full">
			<PlaylistHeader
				name={playlist.metadata.name}
				imageUrl={playlist.metadata.imageUrl}
				size={playlist.metadata.size}
				owner={playlist.metadata.owner}
			/>
			{isLoadingSongs ? (
				<div className="flex justify-center items-center">
					<Loader />
				</div>
			) : (
				<div>
					<div className="p-6">
						<div
							onClick={() =>
								play({
									contextUri: playlist.metadata.uri,
									offsetPosition: 0,
								})
							}
							className="flex justify-center items-center rounded-full w-16 aspect-square bg-spotify-green hover:cursor-pointer hover:bg-green-400 hover:scale-105"
						>
							<FaPlay className="text-spotify-black" size={23} />
						</div>
					</div>
					<div className="p-6">
						<PlaylistContents
							tracks={playlist.tracks}
							contextUri={playlist.metadata.uri}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Songs;
