'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import Loader from '@/components/Loader';
import AlbumHeader from '@/components/AlbumHeader';

import useActiveItemStore from '@/stores/activeItemStore';

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
		setActiveItem(id, 'album');
	}, [setActiveItem]);

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
					<></>
				)}
			</div>
		</div>
	);
};

export default Album;
