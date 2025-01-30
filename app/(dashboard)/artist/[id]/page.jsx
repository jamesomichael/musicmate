'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import Loader from '@/components/Loader';
import ArtistHeader from '@/components/ArtistHeader';

import useArtist from '@/hooks/useArtist';

import useAuthStore from '@/stores/authStore';

import ArtistTopTracks from '@/components/ArtistTopTracks';
import ArtistDiscography from '@/components/ArtistDiscography';

const Artist = () => {
	const { id } = useParams();
	const { accessToken } = useAuthStore();

	const {
		artist,
		artistAlbums,
		topTracks,
		isLoadingArtist,
		isLoadingAlbums,
		isLoadingTopTracks,
	} = useArtist(id, accessToken);

	const albums = artistAlbums.filter((album) => album.album_type === 'album');
	const singles = artistAlbums.filter(
		(album) => album.album_type === 'single'
	);
	const compilations = artistAlbums.filter(
		(album) => album.album_type === 'compilation'
	);

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
			<div className="flex flex-col gap-8 p-6">
				<div className="grid grid-cols-2">
					{isLoadingTopTracks ? (
						<Loader />
					) : (
						<ArtistTopTracks topTracks={topTracks} />
					)}
					<div>
						<Loader />
					</div>
				</div>
				{isLoadingAlbums ? (
					<div className="h-52">
						<Loader />
					</div>
				) : (
					<ArtistDiscography
						albums={albums}
						singles={singles}
						compilations={compilations}
					/>
				)}
			</div>
		</div>
	);
};

export default Artist;
