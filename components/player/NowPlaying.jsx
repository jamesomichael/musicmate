import React from 'react';
import Link from 'next/link';

import FadeIn from '../shared/FadeIn';
import FadeInSlide from '../shared/FadeInSlide';

import usePlayerStore from '@/stores/playerStore';

const NowPlaying = () => {
	const { playbackState } = usePlayerStore();

	return (
		<div className="flex gap-2 py-2">
			<Link href={`/album/${playbackState.item.album.id}`}>
				<FadeIn
					key={playbackState.item.album.images[0].url}
					className="rounded h-full aspect-square bg-center bg-cover"
					style={{
						backgroundImage: `url(${playbackState.item.album.images[0].url})`,
					}}
				></FadeIn>
			</Link>
			<div className="flex flex-col justify-center w-full">
				<FadeInSlide
					key={playbackState.item.name}
					href={`/album/${playbackState.item.album.id}`}
					className="text-sm font-heading line-clamp-1 leading-6"
				>
					{playbackState.item.name}
				</FadeInSlide>

				<div className="flex">
					{playbackState.item.artists.map((artist, index, array) => (
						<div key={artist.id} className="flex items-center">
							<FadeIn
								className="font-copy text-xs text-gray-300"
								key={artist.id}
								href={`/artist/${artist.id}`}
							>
								<span>{artist.name}</span>
							</FadeIn>
							{index < array.length - 1 && (
								<span className="text-gray-400">
									&nbsp;•&nbsp;
								</span>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NowPlaying;
