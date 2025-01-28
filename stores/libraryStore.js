import { create } from 'zustand';
import spotifyService from '@/services/spotify';

import fetchPaginatedData from '@/utils/fetchPaginatedData';

const useLibraryStore = create((set) => {
	return {
		isLoadingPlaylists: false,
		isLoadingAlbums: false,
		isLoadingSongs: false,
		playlists: [],
		albums: [],
		likedSongs: [],
		hasFetchedLikedSongs: false,
		activeTab: 'playlists',

		setPlaylists: async (accessToken) => {
			set({ isLoadingPlaylists: true });
			const uniquePlaylists = await fetchPaginatedData(
				spotifyService.fetchUserPlaylists,
				null,
				accessToken,
				'id'
			);
			const playlists = [
				{
					name: 'Liked Songs',
				},
				...uniquePlaylists,
			];
			set({ isLoadingPlaylists: false, playlists });
		},
		setAlbums: async (accessToken) => {
			set({ isLoadingAlbums: true });
			const uniqueAlbums = await fetchPaginatedData(
				spotifyService.fetchUserAlbums,
				null,
				accessToken,
				'id',
				'album'
			);
			set({ isLoadingAlbums: false, albums: uniqueAlbums });
		},
		setLikedSongs: async (accessToken) => {
			set({ isLoadingSongs: true });
			const likedSongs = await fetchPaginatedData(
				spotifyService.fetchLikedSongs,
				null,
				accessToken,
				'id',
				'track'
			);
			set({
				isLoadingSongs: false,
				hasFetchedLikedSongs: true,
				likedSongs,
			});
		},
		setActiveTab: (activeTab) => set({ activeTab }),
	};
});

export default useLibraryStore;
