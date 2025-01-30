import React from 'react';
import dayjs from 'dayjs';

import { BiAlbum } from 'react-icons/bi';
import Link from 'next/link';

import DiscographyCarousel from './DiscographyCarousel';

const ArtistDiscography = ({ albums, singles, compilations }) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-start items-center gap-2 text-gray-300">
				<BiAlbum size={25} />
				<span className="font-heading font-bold text-lg">
					Discography
				</span>
			</div>
			{albums.length > 0 && (
				<DiscographyCarousel title="albums" data={albums} />
			)}
			{singles.length > 0 && (
				<DiscographyCarousel title="singles" data={singles} />
			)}
			{compilations.length > 0 && (
				<DiscographyCarousel title="compilations" data={compilations} />
			)}
		</div>
	);
};

export default ArtistDiscography;
