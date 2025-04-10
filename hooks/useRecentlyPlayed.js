import { useState, useEffect } from 'react';
import spotifyService from '@/services/spotify';

const useRecentlyPlayed = (accessToken) => {
	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecentlyPlayed = async () => {
			setIsLoading(true);
			const { items } = await spotifyService.fetchUserRecentlyPlayed(
				accessToken
			);
			setRecentlyPlayed(items);
			setIsLoading(false);
		};

		if (accessToken) {
			fetchRecentlyPlayed();
		}
	}, [accessToken]);

	return {
		isLoading,
		recentlyPlayed,
	};
};

export default useRecentlyPlayed;
