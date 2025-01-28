import { useState, useEffect } from 'react';
import fetchPaginatedData from '@/utils/fetchPaginatedData';
import spotifyService from '@/services/spotify';

const useAlbum = (id, accessToken) => {
	const [metadata, setMetadata] = useState({});
	const [data, setData] = useState([]);
	const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
	const [isLoadingData, setIsLoadingData] = useState(true);

	useEffect(() => {
		const fetchAlbum = async () => {
			try {
				const { tracks: initialTracks, ...metadata } =
					await spotifyService.fetchAlbumById(id, accessToken);
				setMetadata(metadata);
				setIsLoadingMetadata(false);

				const albumTracks = await fetchPaginatedData(
					spotifyService.fetchAlbumTracks,
					id,
					accessToken
				);
				setData(albumTracks);
				setIsLoadingData(false);
			} catch (error) {
				console.error('Error fetching album:', error);
			}
		};

		if (accessToken) {
			fetchAlbum();
		}
	}, [id, accessToken]);

	return { metadata, data, isLoadingMetadata, isLoadingData };
};

export default useAlbum;
