import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import { FaRegClock } from 'react-icons/fa6';

import usePlayerStore from '@/stores/playerStore';

const AlbumContents = ({ tracks, contextUri }) => {
	const { play } = usePlayerStore();

	return (
		<>
			<div className="grid grid-cols-[3rem,2fr,5rem] py-1 gap-6 font-copy text-gray-400 text-sm border-b border-neutral-800 mb-4">
				<span className="text-right">#</span>
				<span>Title</span>
				<div className="flex">
					<FaRegClock />
				</div>
			</div>

			{tracks.map((track, index) => {
				return (
					<div
						key={`${track.id}_${index}`}
						onDoubleClick={() => {
							play({
								contextUri,
								offsetUri: track.uri,
							});
						}}
						className="grid h-16 grid-cols-[3rem,2fr,5rem] gap-6 items-center hover:bg-neutral-800 rounded"
					>
						<span className="font-copy text-sm text-right text-gray-300">
							{index + 1}
						</span>
						<div className="flex h-full p-2 gap-2 justify-start items-center">
							<div className="flex flex-col">
								<span className="font-heading text-sm text-gray-200">
									{track.name}
								</span>
								<div className="flex gap-1 items-center">
									{track.explicit && (
										<div className="bg-gray-300 h-4 aspect-square flex justify-center items-center text-spotify-black text-xs font-bold font-copy rounded-sm">
											E
										</div>
									)}
									{track.artists?.map((artist, i) => {
										return (
											<div
												key={artist.id}
												className="flex items-center"
											>
												<Link
													href={`/artist/${artist.id}`}
													className="font-copy text-xs text-gray-300 hover:cursor-pointer hover:underline"
												>
													{artist.name}
												</Link>
												{i + 1 <
													track.artists.length && (
													<span className="text-xs">
														,
													</span>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<span className="font-copy text-gray-300 text-sm">
							{dayjs
								.duration(track.duration_ms, 'milliseconds')
								.format('m:ss')}
						</span>
					</div>
				);
			})}
		</>
	);
};

export default AlbumContents;
