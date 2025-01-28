import { create } from 'zustand';

import useAuthStore from './authStore';

import fetchPaginatedData from '@/utils/fetchPaginatedData';

import spotifyService from '@/services/spotify';

const useActiveItemStore = create((set) => {
	const types = {
		playlist: async (id) => {
			set({
				metadata: {},
				data: [],
				isLoadingMetadata: true,
				isLoadingData: true,
			});
			const accessToken = useAuthStore.getState().accessToken;
			const { tracks: initialTracks, ...metadata } =
				await spotifyService.fetchPlaylistById(id, accessToken);
			set({ metadata, isLoadingMetadata: false });
			const playlistItems = await fetchPaginatedData(
				spotifyService.fetchPlaylistItems,
				id,
				accessToken
			);
			set({ data: playlistItems, isLoadingData: false });
		},
		album: async (id) => {
			set({
				metadata: {},
				data: [],
				isLoadingMetadata: true,
				isLoadingData: true,
			});
			const accessToken = useAuthStore.getState().accessToken;
			const { tracks: initialTracks, ...metadata } =
				await spotifyService.fetchAlbumById(id, accessToken);
			set({ metadata, isLoadingMetadata: false });
			const albumTracks = await fetchPaginatedData(
				spotifyService.fetchAlbumTracks,
				id,
				accessToken
			);
			set({ data: albumTracks, isLoadingData: false });
		},
	};
	return {
		isLoadingMetadata: false,
		isLoadingData: false,
		metadata: {},
		data: [],
		type: null,

		setActiveItem: async (id, type) => {
			set({ type });
			try {
				await types[type](id);
			} catch (error) {
				console.error('Error setting active item:', error.message);
			}
		},
	};
});

export default useActiveItemStore;
