import { useState, useEffect } from 'react';
import fetchPaginatedData from '@/utils/fetchPaginatedData';
import spotifyService from '@/services/spotify';

const usePlaylist = (id, accessToken) => {
	const [metadata, setMetadata] = useState({});
	const [data, setData] = useState([]);
	const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
	const [isLoadingData, setIsLoadingData] = useState(true);

	useEffect(() => {
		const fetchPlaylist = async () => {
			try {
				const { tracks: initialTracks, ...metadata } =
					await spotifyService.fetchPlaylistById(id, accessToken);
				setMetadata(metadata);
				setIsLoadingMetadata(false);

				const playlistItems = await fetchPaginatedData(
					spotifyService.fetchPlaylistItems,
					id,
					accessToken
				);
				setData(playlistItems);
				setIsLoadingData(false);
			} catch (error) {
				console.error('Error fetching playlist:', error);
			}
		};

		if (accessToken) {
			fetchPlaylist();
		}
	}, [id, accessToken]);

	return { metadata, data, isLoadingMetadata, isLoadingData };
};

export default usePlaylist;
