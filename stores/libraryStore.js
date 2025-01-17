import { create } from 'zustand';
import spotifyService from '@/services/spotify';

const useLibraryStore = create((set) => ({
	isLoading: false,
	playlists: [],
	activeTab: 'playlists',

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

		const uniquePlaylists = [
			...new Map(
				allPlaylists.map((playlist) => [playlist.id, playlist])
			).values(),
		];
		set({ isLoading: false, playlists: uniquePlaylists });
	},
	setActiveTab: (activeTab) => set({ activeTab }),
}));

export default useLibraryStore;
