import React from 'react';

import TopTracks from '../shared/TopTracks';

import { FaArrowTrendUp } from 'react-icons/fa6';

const ArtistTopTracks = ({ topTracks }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-start items-center gap-2 text-gray-300">
				<FaArrowTrendUp size={25} />
				<span className="font-heading font-bold text-lg">Popular</span>
			</div>
			<TopTracks data={topTracks} />
		</div>
	);
};

export default ArtistTopTracks;
