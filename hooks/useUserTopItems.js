import { useState, useEffect } from 'react';
import spotifyService from '@/services/spotify';

const useUserTopItems = (accessToken) => {
	const [topTracks, setTopTracks] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTopItems = async () => {
			setIsLoading(true);
			const { items: tracks } = await spotifyService.fetchUserTopTracks(
				{},
				accessToken
			);
			const { items: artists } = await spotifyService.fetchUserTopArtists(
				{},
				accessToken
			);

			setTopTracks(tracks);
			setTopArtists(artists);
			setIsLoading(false);
		};

		if (accessToken) {
			fetchTopItems();
		}
	}, [accessToken]);

	return {
		isLoading,
		topTracks,
		topArtists,
	};
};

export default useUserTopItems;
