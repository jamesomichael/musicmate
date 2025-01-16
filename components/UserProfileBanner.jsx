'use client';
import React from 'react';

import useUserStore from '@/stores/userStore';

const UserProfileBanner = () => {
	const { displayName, followers } = useUserStore();

	return (
		<div className="grid grid-cols-[auto_1fr] items-end h-full pb-4 px-8">
			<div className="w-64">Image</div>
			<div className="flex flex-col gap-4">
				<span className="font-copy text-sm">Profile</span>
				<div className="font-heading text-6xl font-black">
					{displayName}
				</div>
				<div className="font-copy text-sm">
					<span>{followers} Followers</span>
				</div>
			</div>
		</div>
	);
};

export default UserProfileBanner;
