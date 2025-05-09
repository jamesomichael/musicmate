'use client';
import React from 'react';

import DiscographyCarousel from '@/components/shared/DiscographyCarousel';
import Loader from '@/components/shared/Loader';
import TopTracks from '@/components/shared/TopTracks';

import useUserTopItems from '@/hooks/useUserTopItems';

import useAuthStore from '@/stores/authStore';

const UserTopItems = () => {
	const { accessToken } = useAuthStore();
	const { isLoading, topTracks, topArtists } = useUserTopItems(accessToken);

	return isLoading ? (
		<div className="h-44 flex items-center justify-center">
			<Loader />
		</div>
	) : (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<span className="font-heading font-bold text-xl leading-none">
					Top artists this year
				</span>
				<span className="font-copy text-sm text-gray-300">
					Only visible to you
				</span>
				<DiscographyCarousel data={topArtists} type="artist" />
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-heading font-bold text-xl leading-none">
					Top tracks this year
				</span>
				<span className="font-copy text-sm text-gray-300">
					Only visible to you
				</span>
				<TopTracks data={topTracks} showArtists={true} />
			</div>
		</div>
	);
};

export default UserTopItems;
