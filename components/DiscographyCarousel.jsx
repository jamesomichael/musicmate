import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

const DiscographyCarousel = ({ isSearchResult = false, title, type, data }) => {
	return (
		<div className="flex flex-col gap-1">
			<span
				className={`font-heading capitalize ${
					isSearchResult
						? 'text-white text-base font-bold'
						: 'text-neutral-400 text-sm font-semibold'
				}`}
			>
				{title} {!isSearchResult && <>({data.length})</>}
			</span>
			<div className="flex overflow-x-auto">
				{data.map((item) => {
					if (!item) {
						return <></>;
					}
					const imageUrl = item.images[0]?.url;
					return (
						<Link
							href={`/${type}/${item.id}`}
							key={item.id}
							className="grid grid-rows-[auto,1fr] gap-2 p-4 rounded hover:bg-neutral-800"
						>
							<div
								className={`h-44 aspect-square bg-cover bg-center ${
									type === 'artist'
										? 'rounded-full'
										: 'rounded'
								}`}
								style={{
									backgroundImage: `url(${imageUrl})`,
								}}
							></div>
							<div className="flex flex-col gap-1 w-44">
								<span className="hover:underline line-clamp-2 font-heading text-sm">
									{item.name}
								</span>
								<div className="flex items-center gap-1 font-copy text-sm text-gray-400">
									{type === 'artist' ? (
										<>
											<span>Artist</span>
										</>
									) : type === 'playlist' ? (
										<>
											<span>
												By {item.owner.display_name}
											</span>
										</>
									) : (
										<>
											<span>
												{dayjs(
													item.release_date
												).year()}
											</span>
											<span>•</span>
											<span className="capitalize">
												{item.album_type}
											</span>
										</>
									)}
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
