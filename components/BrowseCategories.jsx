'use client';
import React, { useEffect } from 'react';

import useAuthStore from '@/stores/authStore';
import useCategoryStore from '@/stores/categoryStore';

const BrowseCategories = () => {
	const { accessToken } = useAuthStore();
	const { categories, setCategories } = useCategoryStore();

	useEffect(() => {
		if (accessToken) {
			setCategories(accessToken);
		}
	}, [setCategories, accessToken]);

	return (
		<div className="grid grid-cols-12">
			{categories.length > 0 ? (
				categories.map((category) => {
					return (
						<div key={category.id}>
							<div
								className="bg-center bg-cover max-w-48 aspect-square flex justify-start items-end p-2"
								style={{
									backgroundImage: `url(${category.icons[0].url})`,
								}}
							>
								<span className="font-heading text-base text-white">
									{category.name}
								</span>
							</div>
						</div>
					);
				})
			) : (
				<>Loading...</>
			)}
		</div>
	);
};

export default BrowseCategories;
