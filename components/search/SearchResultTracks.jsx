'use client';
import React from 'react';
import dayjs from 'dayjs';

import usePlayerStore from '@/stores/playerStore';

const SearchResultTracks = ({ data }) => {
	const { play } = usePlayerStore();

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-start items-center gap-2 text-white">
				<span className="font-heading font-bold text-base">Songs</span>
			</div>
			<div className="flex flex-col">
				{data.slice(0, 5).map((track, i) => {
					return (
						<div
							key={track.id}
							onDoubleClick={() => {
								play({
									contextUri: track.album.uri,
									offsetUri: track.uri,
								});
							}}
							className="rounded hover:bg-neutral-800 h-14 p-2 grid grid-cols-[1fr,5rem] gap-6 items-center"
						>
							<div className="h-full flex gap-2 items-center">
								<div
									className="h-full mr-1.5 aspect-square rounded bg-cover bg-center"
									style={{
										backgroundImage: `url(${track.album.images[0].url})`,
									}}
								></div>
								{track.explicit && (
									<div className="bg-gray-300 h-4 aspect-square flex justify-center items-center text-spotify-black text-xs font-bold font-copy rounded-sm">
										E
									</div>
								)}
								<span className="line-clamp-1 text-gray-200 font-heading text-sm">
									{track.name}
								</span>
							</div>
							<span className="font-copy text-gray-300 text-sm">
								{dayjs
									.duration(track.duration_ms, 'milliseconds')
									.format('m:ss')}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SearchResultTracks;
