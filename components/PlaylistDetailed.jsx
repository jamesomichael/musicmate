'use client';
import React from 'react';

import { FaPlay } from 'react-icons/fa6';

import PlaylistHeader from './PlaylistHeader';
import PlaylistContents from './PlaylistContents';

import usePlayerStore from '@/stores/playerStore';

const PlaylistDetailed = ({ playlist }) => {
	const { play } = usePlayerStore();
	const { metadata, tracks } = playlist;
	const { name: playlistName, uri, size, imageUrl, owner } = metadata;
	return (
		<div className="select-none grid grid-rows-[auto,auto,1fr]">
			<PlaylistHeader
				name={playlistName}
				imageUrl={imageUrl}
				size={size}
				owner={owner}
			/>
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
					<FaPlay className="text-spotify-black" size={23} />
				</div>
			</div>
			<div className="p-6">
				<PlaylistContents tracks={tracks} contextUri={uri} />
			</div>
		</div>
	);
};

export default PlaylistDetailed;
