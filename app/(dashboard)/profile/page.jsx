'use client';
import React, { useMemo } from 'react';

import UserProfileBanner from '@/components/UserProfileBanner';
import DiscographyCarousel from '@/components/DiscographyCarousel';
import TopTracks from '@/components/TopTracks';
import Loader from '@/components/Loader';

import useUserProfile from '@/hooks/useUserProfile';

import useAuthStore from '@/stores/authStore';

const Profile = () => {
	const { accessToken } = useAuthStore();
	const {
		isLoading,
		topTracks,
		topArtists,
		isLoadingRecentlyPlayed,
		recentlyPlayed,
	} = useUserProfile(accessToken);

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
				{isLoading ? (
					<div className="h-44 flex items-center justify-center">
						<Loader />
					</div>
				) : (
					<>
						<div className="flex flex-col gap-2">
							<span className="font-heading font-bold text-xl leading-none">
								Top artists this year
							</span>
							<span className="font-copy text-sm text-gray-300">
								Only visible to you
							</span>
							<DiscographyCarousel
								data={topArtists}
								type="artist"
							/>
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
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
