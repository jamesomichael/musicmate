'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import { FaPlay } from 'react-icons/fa6';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistContents from '@/components/playlist/PlaylistContents';
import Loader from '@/components/shared/Loader';

import usePlaylist from '@/hooks/usePlaylist';

import useAuthStore from '@/stores/authStore';

const Playlist = () => {
	const { id } = useParams();
	const { accessToken } = useAuthStore();

	const { metadata, data, isLoadingMetadata, isLoadingData } = usePlaylist(
		id,
		accessToken
	);

	const { name: playlistName, description, uri, images, owner } = metadata;

	return (
		<div className="h-full">
			<div className="grid grid-rows-[auto,1fr] h-full">
				{isLoadingMetadata ? (
					<div className="h-72 flex items-center justify-center">
						<Loader />
					</div>
				) : (
					<PlaylistHeader
						name={playlistName}
						description={description}
						imageUrl={images?.length > 0 && images[0].url}
						size={isLoadingData ? null : data.length}
						owner={owner}
					/>
				)}
				{isLoadingData ? (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				) : (
					<div>
						<div className="p-6">
							<div
								onClick={() =>
									play({
										contextUri: uri,
										offsetPosition: 0,
									})
								}
								className="flex justify-center items-center rounded-full w-16 aspect-square bg-spotify-green hover:cursor-pointer hover:bg-green-400 hover:scale-105"
							>
								<FaPlay
									className="text-spotify-black"
									size={23}
								/>
							</div>
						</div>
						<div className="p-6">
							<PlaylistContents tracks={data} contextUri={uri} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Playlist;
