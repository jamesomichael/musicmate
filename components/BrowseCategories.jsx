'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

import Loader from './Loader';

import useAuthStore from '@/stores/authStore';

import useCategoryStore from '@/stores/categoryStore';
import { BiSolidCategory } from 'react-icons/bi';
import { IoWarning } from 'react-icons/io5';

const BrowseCategories = () => {
	const { accessToken } = useAuthStore();
	const { isLoading, categories, setCategories } = useCategoryStore();

	useEffect(() => {
		if (accessToken) {
			setCategories(accessToken);
		}
	}, [setCategories, accessToken]);

	return (
		<div className="overflow-hidden h-full grid grid-rows-[auto_1fr] gap-6">
			<div className="px-8 pt-8 flex flex-col gap-4">
				<div className="flex justify-start items-center gap-2 text-gray-300">
					<BiSolidCategory size={30} />
					<span className="font-heading text-base md:text-lg lg:text-xl font-bold">
						Browse all
					</span>
				</div>
				<div className="flex justify-start items-center">
					<IoWarning size={22} className="text-amber-400" />
					<span className="font-copy text-sm text-spotify-green">
						&nbsp;Unfortunately, this page can no longer function.
						For more information, please&nbsp;
						<Link
							href="https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api"
							target="_blank"
							className="underline hover:text-gray-200"
						>
							click here
						</Link>
						.
					</span>
				</div>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className="overflow-y-scroll cursor-not-allowed px-8 pb-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
						{categories.map((category) => {
							return (
								<div
									key={category.id}
									className="relative bg-center bg-cover w-full aspect-square flex justify-start items-end p-2 rounded overflow-hidden shadow-md"
									style={{
										backgroundImage: `url(${category.icons[0].url})`,
									}}
								>
									<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
									<span className="leading-5 relative font-heading text-sm xl:text-base text-gray-200 line-clamp-2">
										{category.name}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default BrowseCategories;
