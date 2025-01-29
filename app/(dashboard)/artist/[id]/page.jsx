'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import useArtist from '@/hooks/useArtist';

import useAuthStore from '@/stores/authStore';

const Artist = () => {
	const { id } = useParams();
	const { accessToken } = useAuthStore();

	const { artist, artistAlbums, topTracks } = useArtist(id, accessToken);

	console.error('artist', artist);
	console.error('artistAlbums', artistAlbums);
	console.error('topTracks', topTracks);
	return <div>Artist {id}</div>;
};

export default Artist;
