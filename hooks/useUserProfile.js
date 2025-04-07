import { useState, useEffect } from 'react';
import spotifyService from '@/services/spotify';

const useTopItems = (accessToken) => {
	const [topTracks, setTopTracks] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingRecentlyPlayed, setIsLoadingRecentlyPlayed] =
		useState(true);

	useEffect(() => {
		const fetchTopItems = async () => {
			setIsLoading(true);
			const { items: tracks } = await spotifyService.fetchUserTopTracks(
				accessToken
			);
			const { items: artists } = await spotifyService.fetchUserTopArtists(
				accessToken
			);

			setTopTracks(tracks);
			setTopArtists(artists);
			setIsLoading(false);
		};

		const fetchRecentlyPlayed = async () => {
			setIsLoadingRecentlyPlayed(true);
			const { items } = await spotifyService.fetchUserRecentlyPlayed(
				accessToken
			);
			setRecentlyPlayed(items);
			setIsLoadingRecentlyPlayed(false);
		};

		if (accessToken) {
			fetchTopItems();
			fetchRecentlyPlayed();
		}
	}, [accessToken]);

	return {
		isLoading,
		topTracks,
		topArtists,
		isLoadingRecentlyPlayed,
		recentlyPlayed,
	};
};

export default useTopItems;
