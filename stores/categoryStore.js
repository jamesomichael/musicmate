import { create } from 'zustand';

import spotifyService from '@/services/spotify';

const useCategoryStore = create((set) => ({
	isLoading: false,
	categories: [],

	setCategories: async (accessToken) => {
		set({ isLoading: true });
		const limit = 50;
		let offset = 0;
		let allCategories = [];
		let hasMore = true;

		while (hasMore) {
			const data = await spotifyService.fetchCategories(
				{ limit, offset },
				accessToken
			);
			allCategories = [...allCategories, ...data.categories.items];
			offset += limit;
			hasMore = data.categories.items.length === limit;
		}
		const uniqueCategories = [
			...new Map(allCategories.map((item) => [item.id, item])).values(),
		];
		set({ isLoading: false, categories: uniqueCategories });
	},
}));

export default useCategoryStore;
