'use client';
import React from 'react';
import Link from 'next/link';

import Loader from '../shared/Loader';

import useLibraryStore from '@/stores/libraryStore';

const SuggestionsGrid = () => {
	const { isLoadingPlaylists, playlists } = useLibraryStore();

	return isLoadingPlaylists ? (
		<div className="h-80">
			<Loader />
		</div>
	) : (
		<div className="p-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{playlists.slice(1, 9).map((playlist, i) => {
				return (
					<Link
						key={playlist.id}
						href={`/playlist/${playlist.id}`}
						className="transition-all duration-200 grid grid-cols-[auto,1fr] gap-2 rounded h-[4.5rem] bg-white bg-opacity-5 hover:bg-opacity-15"
					>
						<div
							className="h-full aspect-square bg-cover bg-center rounded-l"
							style={
								playlist.images?.length > 0
									? {
											backgroundImage: `url(${playlist.images[0].url})`,
									  }
									: {}
							}
						></div>
						<span className="p-2 flex items-center font-medium font-heading text-sm line-clamp-2">
							{playlist.name}
						</span>
					</Link>
				);
			})}
		</div>
	);
};

export default SuggestionsGrid;
