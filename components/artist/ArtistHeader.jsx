import React from 'react';
import { motion } from 'framer-motion';

import Loader from '../shared/Loader';
import FadeInSlide from '../shared/FadeInSlide';
import FadeIn from '../shared/FadeIn';

import useDynamicGradient from '@/hooks/useDynamicGradient';

const ArtistHeader = ({ artist }) => {
	const { gradient, isLoading } = useDynamicGradient(artist.images[0].url);
	return isLoading ? (
		<div className="h-full">
			<Loader />
		</div>
	) : (
		<div
			className="h-full p-6 grid grid-cols-[auto_1fr] gap-6"
			style={{ background: gradient }}
		>
			<FadeIn
				key={artist.name}
				className="shadow-xl h-full aspect-square bg-cover bg-center rounded-full"
				style={{ backgroundImage: `url(${artist.images[0].url})` }}
			></FadeIn>
			<div className="flex flex-col justify-end gap-4">
				<span className="font-copy text-xs">Artist</span>
				<FadeInSlide
					key={artist.name}
					className="font-heading font-black text-6xl"
				>
					{artist.name}
				</FadeInSlide>
				<div className="flex items-center gap-2">
					<span className="text-sm font-copy">
						{artist.followers.total.toLocaleString()} followers
					</span>
					{artist.genres.length > 0 && (
						<div className="text-xs font-copy gap-2 flex items-center">
							<span className="text-gray-300">•</span>
							{artist.genres.map((genre) => {
								return (
									<span
										key={genre}
										className="bg-gradient-to-r from-neutral-800 to-black text-spotify-green px-3 py-1 rounded-full font-bold"
									>
										{genre}
									</span>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ArtistHeader;
