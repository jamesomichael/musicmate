import { create } from 'zustand';
import spotifyService from '@/services/spotify';

const useLibraryStore = create((set) => {
	const fetchPaginatedData = async (
		fetchFn,
		accessToken,
		idKey,
		objectKey
	) => {
		const limit = 50;
		let offset = 0;
		let allItems = [];
		let hasMore = true;

		while (hasMore) {
			const data = await fetchFn({ limit, offset }, accessToken);
			allItems = [...allItems, ...data.items];
			offset += limit;
			hasMore = data.items.length === limit;
		}

		return [
			...new Map(
				allItems.map((item) => [
					objectKey ? item[objectKey][idKey] : item[idKey],
					item,
				])
			).values(),
		];
	};

	return {
		isLoading: false,
		playlists: [],
		albums: [],
		likedSongs: [],
		activeTab: 'playlists',

		setPlaylists: async (accessToken) => {
			set({ isLoading: true });
			const uniquePlaylists = await fetchPaginatedData(
				spotifyService.fetchUserPlaylists,
				accessToken,
				'id'
			);
			set({ isLoading: false, playlists: uniquePlaylists });
		},
		setAlbums: async (accessToken) => {
			set({ isLoading: true });
			const uniqueAlbums = await fetchPaginatedData(
				spotifyService.fetchUserAlbums,
				accessToken,
				'id',
				'album'
			);
			set({ isLoading: false, albums: uniqueAlbums });
		},
		setLikedSongs: async (accessToken) => {
			set({ isLoading: true });
			const likedSongs = await fetchPaginatedData(
				spotifyService.fetchLikedSongs,
				accessToken,
				'id',
				'track'
			);
			console.log(likedSongs);
			set({ isLoading: false, likedSongs });
		},
		setActiveTab: (activeTab) => set({ activeTab }),
	};
});

export default useLibraryStore;
