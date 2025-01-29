'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import Loader from '@/components/Loader';
import ArtistHeader from '@/components/ArtistHeader';

import useArtist from '@/hooks/useArtist';

import useAuthStore from '@/stores/authStore';

import ArtistTopTracks from '@/components/ArtistTopTracks';

const Artist = () => {
	const { id } = useParams();
	const { accessToken } = useAuthStore();

	const { artist, artistAlbums, topTracks, isLoadingArtist } = useArtist(
		id,
		accessToken
	);

	console.error('artist', artist);
	console.error('artistAlbums', artistAlbums);
	console.error('topTracks', topTracks);
	return (
		<div className="select-none h-full">
			<div className="grid grid-rows-[auto,1fr]">
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
			<div className="flex flex-col gap-2 p-6">
				<div className="grid grid-cols-2">
					<ArtistTopTracks topTracks={topTracks} />
					<div>
						<Loader />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Artist;
