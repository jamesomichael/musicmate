import React from 'react';

import DiscographyCarousel from '../shared/DiscographyCarousel';

import { BiAlbum } from 'react-icons/bi';

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
				<DiscographyCarousel
					type="album"
					title="Albums"
					data={albums}
				/>
			)}
			{singles.length > 0 && (
				<DiscographyCarousel
					type="album"
					title="Singles"
					data={singles}
				/>
			)}
			{compilations.length > 0 && (
				<DiscographyCarousel
					type="album"
					title="Compilations"
					data={compilations}
				/>
			)}
		</div>
	);
};

export default ArtistDiscography;
