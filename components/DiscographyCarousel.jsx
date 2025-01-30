import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

const DiscographyCarousel = ({ title, data }) => {
	return (
		<div className="flex flex-col gap-1">
			<span className="font-heading font-semibold text-neutral-400 text-sm capitalize">
				{title} ({data.length})
			</span>
			<div className="flex overflow-x-auto">
				{data.map((item) => {
					return (
						<Link
							href={`/album/${item.id}`}
							key={item.id}
							className="grid grid-rows-[auto,1fr] gap-2 p-4 rounded hover:bg-neutral-800"
						>
							<div
								className="h-44 aspect-square rounded bg-cover bg-center"
								style={{
									backgroundImage: `url(${item.images[0].url})`,
								}}
							></div>
							<div className="flex flex-col gap-1 w-44">
								<span className="hover:underline line-clamp-2 font-heading text-sm">
									{item.name}
								</span>
								<div className="flex items-center gap-1 font-copy text-sm text-gray-400">
									<span>
										{dayjs(item.release_date).year()}
									</span>
									<span>•</span>
									<span className="capitalize">
										{item.album_type}
									</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default DiscographyCarousel;
