'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { FaPlay } from 'react-icons/fa6';

import Loader from '@/components/Loader';
import AlbumHeader from '@/components/AlbumHeader';

import useActiveItemStore from '@/stores/activeItemStore';
import AlbumContents from '@/components/AlbumContents';

const Album = () => {
	const { id } = useParams();
	const { setActiveItem, metadata, data, isLoadingMetadata, isLoadingData } =
		useActiveItemStore();

	const {
		artists,
		images,
		uri,
		name: albumName,
		release_date: releaseDate,
		total_tracks: totalTracks,
	} = metadata;

	useEffect(() => {
		if (id) {
			setActiveItem(id, 'album');
		}
	}, [id, setActiveItem]);

	console.log('data', data);
	console.log('metadata', metadata);

	return (
		<div className="h-full">
			<div className="select-none grid grid-rows-[auto,1fr] h-full">
				{isLoadingMetadata ? (
					<div className="h-72 flex items-center justify-center">
						<Loader />
					</div>
				) : (
					<>
						<AlbumHeader
							name={albumName}
							artists={artists}
							imageUrl={images?.length > 0 && images[0].url}
							releaseDate={releaseDate}
							totalTracks={totalTracks}
						/>
					</>
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
							<AlbumContents tracks={data} contextUri={uri} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Album;
