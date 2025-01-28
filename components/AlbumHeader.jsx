import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import Loader from './Loader';

import getDynamicGradient from '@/utils/getDynamicGradient';

const AlbumHeader = ({ name, artists, imageUrl, releaseDate, totalTracks }) => {
	const defaultGradient = 'linear-gradient(to bottom, #3fbf3f, #3fbf3f)';
	const [gradient, setGradient] = useState(defaultGradient);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (imageUrl) {
			const generateGradient = async () => {
				setIsLoading(true);
				const dynamicGradient = await getDynamicGradient(
					imageUrl,
					defaultGradient
				);
				setGradient(dynamicGradient);
				setIsLoading(false);
			};
			generateGradient();
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
						<span className="font-copy text-xs">Album</span>
						<span className="font-heading text-6xl font-black">
							{name}
						</span>
						<div className="flex gap-4 text-sm font-copy">
							<div className="flex gap-1">
								{artists.map((artist, i) => {
									return (
										<div key={artist.id}>
											<Link
												href={`/artist/${artist.id}`}
												className="font-bold hover:cursor-pointer hover:underline"
											>
												{artist.name}
											</Link>
											{i + 1 < artists.length && (
												<span className="pl-1 text-gray-300">
													•
												</span>
											)}
										</div>
									);
								})}
								{releaseDate && (
									<div className="flex gap-1 text-neutral-300">
										<span className="">•</span>
										<span>{dayjs(releaseDate).year()}</span>
									</div>
								)}
								{totalTracks && (
									<div className="flex gap-1 text-neutral-300">
										<span className="">•</span>
										<span>{totalTracks} songs</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AlbumHeader;
