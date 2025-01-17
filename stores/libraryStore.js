import { create } from 'zustand';
import spotifyService from '@/services/spotify';

const useLibraryStore = create((set) => ({
	isLoading: false,
	playlists: [],

	setPlaylists: async (accessToken) => {
		set({ isLoading: true });
		const limit = 50;
		let offset = 0;
		let allPlaylists = [];
		let hasMore = true;

		while (hasMore) {
			const data = await spotifyService.fetchUserPlaylists(
				{ limit, offset },
				accessToken
			);

			allPlaylists = [...allPlaylists, ...data.items];
			offset += limit;
			hasMore = data.items.length === limit;
		}

		set({ isLoading: false, playlists: allPlaylists });
	},
}));

export default useLibraryStore;
