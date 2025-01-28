import React, { useState, useEffect } from 'react';
import { Vibrant } from 'node-vibrant/browser';

import Loader from './Loader';

const PlaylistHeader = ({ size, name, imageUrl, owner }) => {
	const [gradient, setGradient] = useState(
		'linear-gradient(to bottom, #3fbf3f, #3fbf3f)'
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (imageUrl) {
			Vibrant.from(imageUrl)
				.getPalette()
				.then((palette) => {
					const colourFrom = palette.DarkVibrant.hex;
					const colourTo = palette.DarkMuted.hex;
					setGradient(
						`linear-gradient(to bottom, ${colourFrom}, ${colourTo})`
					);
					setIsLoading(false);
				})
				.catch((err) => {
					console.error('Error generating colors:', err.message);
					setGradient('linear-gradient(to bottom, #3fbf3f, #3fbf3f)');
					setIsLoading(false);
				});
		}
	}, [imageUrl]);

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
					<div
						className="h-full aspect-square bg-cover bg-center rounded"
						style={{ backgroundImage: `url(${imageUrl})` }}
					></div>
					<div className="flex flex-col justify-end gap-4">
						<span className="font-copy text-xs">Playlist</span>
						<span className="font-heading text-6xl font-black">
							{name}
						</span>
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
