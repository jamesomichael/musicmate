'use client';
import React from 'react';

import useUserStore from '@/stores/userStore';
// import useLibraryStore from '@/stores/libraryStore';

const UserProfileBanner = () => {
	const { displayName, followers } = useUserStore();
	// const { playlists, isLoadingPlaylists } = useLibraryStore();

	return (
		<div className="grid grid-cols-[auto_1fr] gap-8 items-end h-full pb-4 px-8">
			<div>
				<div
					className="h-56 aspect-square bg-cover bg-center rounded-full"
					style={{
						backgroundImage:
							'url(https://content.imageresizer.com/images/memes/Homer-Napping-meme-4.jpg)',
					}}
				></div>
			</div>
			<div className="flex flex-col gap-4">
				<span className="font-copy text-sm">Profile</span>
				<div className="font-heading text-6xl font-black">
					{displayName}
				</div>
				<div className="flex gap-4 font-copy text-sm">
					{/* {!isLoadingPlaylists && (
						<span>{playlists.length}&nbsp;Playlists</span>
					)} */}
					<span>{followers} Followers</span>
				</div>
			</div>
		</div>
	);
};

export default UserProfileBanner;
