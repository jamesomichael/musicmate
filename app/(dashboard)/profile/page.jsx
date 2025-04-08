'use client';
import React, { useMemo } from 'react';

import UserProfileBanner from '@/components/UserProfileBanner';
import DiscographyCarousel from '@/components/DiscographyCarousel';
import Loader from '@/components/Loader';
import UserTopItems from '@/components/UserTopItems';

import useUserProfile from '@/hooks/useUserProfile';

import useAuthStore from '@/stores/authStore';

const Profile = () => {
	const { accessToken } = useAuthStore();
	const { isLoadingRecentlyPlayed, recentlyPlayed } =
		useUserProfile(accessToken);

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

	return (
		<div className="flex flex-col">
			<div className="h-80 bg-gradient-to-b from-neutral-600 to-neutral-800">
				<UserProfileBanner />
			</div>
			<div className="flex flex-col gap-8 p-6">
				<UserTopItems />
				{isLoadingRecentlyPlayed ? (
					<Loader />
				) : (
					<div className="flex flex-col gap-2">
						<span className="font-heading font-bold text-xl leading-none">
							Recently played albums
						</span>
						<DiscographyCarousel
							data={recentlyPlayedAlbums}
							type="album"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
