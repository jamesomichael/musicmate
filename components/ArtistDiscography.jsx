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
			<DiscographyCarousel title="albums" data={albums} />
			<DiscographyCarousel title="singles" data={singles} />
			<DiscographyCarousel title="compilations" data={compilations} />
		</div>
	);
};

export default ArtistDiscography;
