import React from 'react';
import { cookies } from 'next/headers';

import spotifyService from '@/services/spotify';

import PlaylistDetailed from '@/components/PlaylistDetailed';

const Playlist = async ({ params }) => {
	const { id } = await params;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;
	const { tracks, ...metadata } = await spotifyService.fetchPlaylistById(
		id,
		accessToken
	);
	const playlist = {
		metadata: {
			...metadata,
			imageUrl: metadata.images[0].url,
			size: tracks.items.length,
		},
		tracks: tracks.items,
	};
	return (
		<div>
			<PlaylistDetailed playlist={playlist} />
		</div>
	);
};

export default Playlist;
