'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import Loader from '@/components/shared/Loader';
import TopSearchResult from '@/components/search/TopSearchResult';
import DiscographyCarousel from '@/components/shared/DiscographyCarousel';
import SearchResultTracks from '@/components/search/SearchResultTracks';

import useSearch from '@/hooks/useSearch';

import useAuthStore from '@/stores/authStore';

const SearchResults = () => {
	const { query } = useParams();
	const { accessToken } = useAuthStore();

	const { isLoading, topResult, albums, tracks, artists, playlists } =
		useSearch(query, accessToken);

	return isLoading ? (
		<Loader />
	) : (
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

export default SearchResults;
