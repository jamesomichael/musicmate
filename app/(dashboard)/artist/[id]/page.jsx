'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import Loader from '@/components/Loader';
import ArtistHeader from '@/components/ArtistHeader';

import useArtist from '@/hooks/useArtist';

import useAuthStore from '@/stores/authStore';

const Artist = () => {
	const { id } = useParams();
	const { accessToken } = useAuthStore();

	const { artist, artistAlbums, topTracks, isLoadingArtist } = useArtist(
		id,
		accessToken
	);

	console.error('artist', artist);
	// console.error('artistAlbums', artistAlbums);
	// console.error('topTracks', topTracks);
	return (
		<div className="h-full">
			<div className="select-none grid grid-rows-[auto,1fr] h-full">
				<div className="h-80">
					{isLoadingArtist ? (
						<Loader />
					) : (
						<>
							<ArtistHeader artist={artist} />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Artist;
