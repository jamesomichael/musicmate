import { create } from 'zustand';
import spotifyService from '@/services/spotify';

const useLibraryStore = create((set) => ({
	playlists: [],

	setPlaylists: async (accessToken) => {
		const limit = 50;
		const offset = 0;
		const data = await spotifyService.fetchUserPlaylists(
			{ limit, offset },
			accessToken
		);
		const playlists = data.items;
		console.log('playlists', playlists);
		set({ playlists });
	},
}));

export default useLibraryStore;
