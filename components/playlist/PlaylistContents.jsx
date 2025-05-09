import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { FaRegClock } from 'react-icons/fa6';

import usePlayerStore from '@/stores/playerStore';

dayjs.extend(duration);

const PlaylistContents = ({ tracks, contextUri }) => {
	const { play } = usePlayerStore();
	return (
		<>
			<div className="grid grid-cols-[3rem,2fr,1fr,1fr,5rem] py-1 gap-6 font-copy text-gray-400 text-sm border-b border-neutral-800 mb-4">
				<span className="text-right">#</span>
				<span>Title</span>
				<span>Album</span>
				<span className="flex">Date added</span>
				<div className="flex">
					<FaRegClock />
				</div>
			</div>

			{tracks.map(({ track, added_at: addedAt }, index) => {
				return (
					<div
						key={`${track.id}_${index}`}
						onDoubleClick={() => {
							play({
								contextUri,
								offsetUri: track.uri,
							});
						}}
						className="grid h-16 grid-cols-[3rem,2fr,1fr,1fr,5rem] gap-6 items-center hover:bg-neutral-800 rounded"
					>
						<span className="font-copy text-sm text-right text-gray-300">
							{index + 1}
						</span>
						<div className="flex h-full p-2 gap-2 justify-start items-center truncate">
							<div
								className="bg-cover bg-center h-full aspect-square rounded"
								style={{
									backgroundImage: `url(${track.album.images[0]?.url})`,
								}}
							></div>
							<div className="flex flex-col truncate">
								<span className="font-heading text-sm text-gray-200 truncate">
									{track.name}
								</span>
								<Link
									href={`/artist/${track.artists[0].id}`}
									className="font-copy text-xs text-gray-300 hover:underline"
								>
									{track.artists[0].name}
								</Link>
							</div>
						</div>
						<Link
							href={`/album/${track.album.id}`}
							className="font-copy text-sm text-gray-300 truncate hover:underline"
						>
							{track.album.name}
						</Link>
						<span className="font-copy text-gray-300 text-sm">
							{dayjs().diff(dayjs(addedAt), 'weeks') > 4
								? dayjs(addedAt).format('D MMM YYYY')
								: dayjs().diff(dayjs(addedAt), 'weeks') > 1
								? `${dayjs().diff(
										dayjs(addedAt),
										'weeks'
								  )} weeks ago`
								: dayjs().diff(dayjs(addedAt), 'weeks') === 1
								? `${dayjs().diff(
										dayjs(addedAt),
										'weeks'
								  )} week ago`
								: dayjs(addedAt).fromNow()}
						</span>
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

export default PlaylistContents;
