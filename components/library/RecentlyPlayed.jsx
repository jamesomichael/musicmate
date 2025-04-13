import React, { useMemo } from 'react';

import DiscographyCarousel from '../shared/DiscographyCarousel';
import Loader from '../shared/Loader';

import useRecentlyPlayed from '@/hooks/useRecentlyPlayed';

import useAuthStore from '@/stores/authStore';

const RecentlyPlayed = () => {
	const { accessToken } = useAuthStore();
	const { isLoading, recentlyPlayed } = useRecentlyPlayed(accessToken);

	const recentlyPlayedAlbums = useMemo(() => {
		return [
			...new Map(
				recentlyPlayed
					?.map((item) => item.track?.album)
					.filter(Boolean)
					.map((album) => [album.id, album])
			).values(),
		];
	}, [recentlyPlayed]);

	return isLoading ? (
		<Loader />
	) : (
		<div className="flex flex-col gap-2">
			<span className="font-heading font-bold text-xl leading-none">
				Recently played albums
			</span>
			<DiscographyCarousel data={recentlyPlayedAlbums} type="album" />
		</div>
	);
};

export default RecentlyPlayed;
