import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';

import TopSearchResult from '@/components/TopSearchResult';
import DiscographyCarousel from '@/components/DiscographyCarousel';

import spotifyService from '@/services/spotify';

const Search = async ({ searchParams }) => {
	const params = await searchParams;
	const query = params.q;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;
	const results = await spotifyService.search(query, {}, accessToken);

	const topResult = results?.albums?.items[0];
	const albums = results?.albums?.items;
	// console.error('topResult', topResult);
	return (
		<div className="select-none flex flex-col gap-6 p-6">
			<div className="grid grid-cols-[1fr,2fr] gap-2">
				<div className="w-full flex flex-col gap-2">
					<TopSearchResult data={topResult} />
				</div>
				<div>Songs</div>
			</div>
			<div>
				<DiscographyCarousel
					title="Albums"
					type="album"
					data={albums}
				/>
			</div>
		</div>
	);
};

export default Search;
