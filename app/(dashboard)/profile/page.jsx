import React from 'react';

import UserProfileBanner from '@/components/UserProfileBanner';

const Profile = () => {
	return (
		<div className="flex flex-col">
			<div className="h-80 bg-gradient-to-b from-neutral-600 to-neutral-800">
				<UserProfileBanner />
			</div>
		</div>
	);
};

export default Profile;
