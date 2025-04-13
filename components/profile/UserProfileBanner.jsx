'use client';
import React from 'react';

import FadeIn from '../shared/FadeIn';
import FadeInSlide from '../shared/FadeInSlide';
import Loader from '../shared/Loader';

import { FaRegUser } from 'react-icons/fa6';

import useUserStore from '@/stores/userStore';

import useDynamicGradient from '@/hooks/useDynamicGradient';

const UserProfileBanner = () => {
	const { displayName, followers, images } = useUserStore();
	const { gradient, isLoading } = useDynamicGradient(images[0]?.url);

	const hasProfilePicture = images?.length > 0;

	return isLoading ? (
		<div className="h-full">
			<Loader />
		</div>
	) : (
		<div
			className="h-full p-6 grid grid-cols-[auto_1fr] gap-6"
			style={hasProfilePicture ? { background: gradient } : {}}
		>
			{hasProfilePicture ? (
				<FadeIn
					key={displayName}
					className="shadow-xl h-full aspect-square bg-cover bg-center rounded-full"
					style={{ backgroundImage: `url(${images[0].url})` }}
				></FadeIn>
			) : (
				<div className="shadow-xl h-full aspect-square rounded-full bg-neutral-950 flex justify-center items-center">
					<FaRegUser className="text-6xl text-neutral-400" />
				</div>
			)}
			<div className="flex flex-col justify-end gap-4">
				<span className="font-copy text-xs">Profile</span>
				<FadeInSlide
					key={displayName}
					className="font-heading font-black text-6xl"
				>
					{displayName}
				</FadeInSlide>
				<div className="flex items-center gap-2">
					<span className="text-sm font-copy">
						{followers?.toLocaleString()} followers
					</span>
				</div>
			</div>
		</div>
	);
};

export default UserProfileBanner;
