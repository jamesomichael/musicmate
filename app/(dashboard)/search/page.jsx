import React from 'react';
import { cookies } from 'next/headers';

import TopSearchResult from '@/components/TopSearchResult';
import DiscographyCarousel from '@/components/DiscographyCarousel';
import SearchResultTracks from '@/components/SearchResultTracks';

import spotifyService from '@/services/spotify';

const Search = async ({ searchParams }) => {
	const params = await searchParams;
	const query = params.q;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;

	const results = await spotifyService.search(query, {}, accessToken);

	const topResult = results?.albums?.items[0];
	const albums = results?.albums?.items;
	const tracks = results?.tracks?.items;
	const artists = results?.artists?.items;
	const playlists = results?.playlists?.items;

	return (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-4">
				<div className="w-full flex flex-col gap-2">
					<TopSearchResult data={topResult} />
				</div>
				<div>
					<SearchResultTracks data={tracks} />
				</div>
			</div>
			<DiscographyCarousel
				showCount={false}
				isSearchResult={true}
				title="Artists"
				type="artist"
				data={artists}
			/>
			<DiscographyCarousel
				showCount={false}
				isSearchResult={true}
				title="Albums"
				type="album"
				data={albums}
			/>
			<DiscographyCarousel
				showCount={false}
				isSearchResult={true}
				title="Playlists"
				type="playlist"
				data={playlists}
			/>
		</div>
	);
};

export default Search;
