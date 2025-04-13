import React from 'react';
import he from 'he';

import Loader from '../shared/Loader';
import FadeIn from '../shared/FadeIn';
import FadeInSlide from '../shared/FadeInSlide';

import useDynamicGradient from '@/hooks/useDynamicGradient';

const PlaylistHeader = ({ size, description, name, imageUrl, owner }) => {
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
						{description && (
							<FadeIn
								key={description}
								className="font-copy text-sm text-gray-300"
							>
								{he.decode(description)}
							</FadeIn>
						)}
						<div className="flex gap-1.5 text-sm font-copy">
							<span className="font-medium">
								{owner.display_name}
							</span>
							{size && (
								<>
									<span className="text-gray-300">•</span>
									<span className="text-gray-300">
										{size} songs
									</span>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlaylistHeader;
