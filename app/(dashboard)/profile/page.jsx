'use client';
import React from 'react';

import UserProfileBanner from '@/components/UserProfileBanner';
import UserTopItems from '@/components/UserTopItems';
import RecentlyPlayed from '@/components/RecentlyPlayed';

const Profile = () => {
	return (
		<div className="flex flex-col">
			<div className="h-80 bg-gradient-to-b from-neutral-600 to-neutral-800">
				<UserProfileBanner />
			</div>
			<div className="flex flex-col gap-8 p-6">
				<UserTopItems />
				<RecentlyPlayed />
			</div>
		</div>
	);
};

export default Profile;
