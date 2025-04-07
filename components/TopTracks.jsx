import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import usePlayerStore from '@/stores/playerStore';

const TopTracks = ({ data, showArtists = false }) => {
	const { play } = usePlayerStore();

	return (
		<div className="flex flex-col">
			{data.slice(0, 5).map((topTrack, i) => {
				return (
					<div
						key={topTrack.id}
						onDoubleClick={() => {
							play({
								contextUri: topTrack.album.uri,
								offsetUri: topTrack.uri,
							});
						}}
						className="rounded hover:bg-neutral-800 h-14 py-2 grid grid-cols-[3rem,1fr,5rem] gap-6 items-center"
					>
						<span className="text-right text-gray-300 font-copy text-sm">
							{i + 1}
						</span>
						<div className="h-full flex gap-2 items-center">
							<div
								className="h-full mr-1.5 aspect-square rounded bg-cover bg-center"
								style={{
									backgroundImage: `url(${topTrack.album.images[0].url})`,
								}}
							></div>
							<div className="flex flex-col">
								<div className="flex gap-2 items-center">
									{topTrack.explicit && (
										<div className="bg-gray-300 h-4 aspect-square flex justify-center items-center text-spotify-black text-xs font-bold font-copy rounded-sm">
											E
										</div>
									)}
									<span className="line-clamp-1 text-gray-200 font-heading text-sm">
										{topTrack.name}
									</span>
								</div>
								{showArtists && (
									<Link
										href={`/artist/${topTrack.artists[0].id}`}
										className="font-copy text-xs text-gray-300 hover:underline"
									>
										{topTrack.artists[0].name}
									</Link>
								)}
							</div>
						</div>
						{/* <span className="justify-self-center"> */}
						{/* {topTrack.popularity} */}
						{/* </span> */}
						<span className="font-copy text-gray-300 text-sm">
							{dayjs
								.duration(topTrack.duration_ms, 'milliseconds')
								.format('m:ss')}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default TopTracks;
