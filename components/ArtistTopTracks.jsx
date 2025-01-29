import React from 'react';
import dayjs from 'dayjs';

import { FaArrowTrendUp } from 'react-icons/fa6';

import usePlayerStore from '@/stores/playerStore';

const ArtistTopTracks = ({ topTracks }) => {
	const { play } = usePlayerStore();

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-start items-center gap-2 text-gray-300">
				<FaArrowTrendUp size={25} />
				<span className="font-heading font-bold text-lg">Popular</span>
			</div>
			<div className="flex flex-col">
				{topTracks.slice(0, 5).map((topTrack, i) => {
					return (
						<div
							key={topTrack.id}
							onDoubleClick={() => {
								play({
									contextUri: topTrack.album.uri,
									offsetUri: topTrack.uri,
								});
							}}
							className="rounded hover:bg-neutral-800 h-16 grid grid-cols-[3rem,1fr,5rem] gap-6 items-center"
						>
							<span className="text-right text-gray-300 font-copy text-sm">
								{i + 1}
							</span>
							<div className="h-full py-2 flex gap-2 items-center">
								<div
									className="h-full mr-1.5 aspect-square rounded bg-cover bg-center"
									style={{
										backgroundImage: `url(${topTrack.album.images[0].url})`,
									}}
								></div>
								{topTrack.explicit && (
									<div className="bg-gray-300 h-4 aspect-square flex justify-center items-center text-spotify-black text-xs font-bold font-copy rounded-sm">
										E
									</div>
								)}
								<span className="line-clamp-1 text-gray-200 font-heading text-sm">
									{topTrack.name}
								</span>
							</div>
							{/* <span className="justify-self-center"> */}
							{/* {topTrack.popularity} */}
							{/* </span> */}
							<span className="font-copy text-gray-300 text-sm">
								{dayjs
									.duration(
										topTrack.duration_ms,
										'milliseconds'
									)
									.format('m:ss')}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ArtistTopTracks;
