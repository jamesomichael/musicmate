import React from 'react';
import dayjs from 'dayjs';

import { BiAlbum } from 'react-icons/bi';
import Link from 'next/link';

const ArtistDiscography = ({ albums, singles, compilations }) => {
	console.error('albums', albums);
	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-start items-center gap-2 text-gray-300">
				<BiAlbum size={25} />
				<span className="font-heading font-bold text-lg">
					Discography
				</span>
			</div>
			<div className="flex overflow-x-auto">
				{albums.map((album) => {
					return (
						<Link
							href={`/album/${album.id}`}
							key={album.id}
							className="grid grid-rows-[auto,1fr] gap-2 p-4 rounded hover:bg-neutral-800"
						>
							<div
								className="h-44 aspect-square rounded bg-cover bg-center"
								style={{
									backgroundImage: `url(${album.images[0].url})`,
								}}
							></div>
							<div className="flex flex-col gap-1 w-44">
								<span className="hover:underline line-clamp-2 font-heading text-sm">
									{album.name}
								</span>
								<div className="flex items-center gap-1 font-copy text-sm text-gray-400">
									<span>
										{dayjs(album.release_date).year()}
									</span>
									<span>•</span>
									<span className="capitalize">
										{album.album_type}
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

export default ArtistDiscography;
