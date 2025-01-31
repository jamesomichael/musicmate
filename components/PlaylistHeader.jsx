import React from 'react';

import Loader from './Loader';
import FadeIn from './FadeIn';
import FadeInSlide from './FadeInSlide';

import useDynamicGradient from '@/hooks/useDynamicGradient';

const PlaylistHeader = ({ size, name, imageUrl, owner }) => {
	const { gradient, isLoading } = useDynamicGradient(imageUrl);

	return (
		<div className="h-72">
			{isLoading ? (
				<Loader />
			) : (
				<div
					className={`p-6 h-full grid grid-cols-[auto_1fr] gap-6`}
					style={{
						background: gradient,
					}}
				>
					<FadeIn
						key={name}
						className="h-full aspect-square bg-cover bg-center rounded"
						style={{ backgroundImage: `url(${imageUrl})` }}
					></FadeIn>
					<div className="flex flex-col justify-end gap-4">
						<span className="font-copy text-xs">Playlist</span>
						<FadeInSlide
							key={name}
							className="font-heading text-6xl font-black"
						>
							{name}
						</FadeInSlide>
						<div className="flex gap-4 text-sm font-copy">
							<span className="font-medium">
								{owner.display_name}
							</span>
							{size && (
								<span className="text-gray-300">
									{size} songs
								</span>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlaylistHeader;
