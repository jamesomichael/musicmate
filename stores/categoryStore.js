import { create } from 'zustand';

import spotifyService from '@/services/spotify';

const useCategoryStore = create((set) => ({
	isLoading: false,
	categories: [],

	setCategories: async (accessToken) => {
		set({ isLoading: true });
		const categories = await spotifyService.fetchCategories(
			{},
			accessToken
		);
		console.log('categories', categories);
		set({ isLoading: false, categories: categories.categories.items });
	},
}));

export default useCategoryStore;
