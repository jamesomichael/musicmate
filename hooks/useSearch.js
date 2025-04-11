import { useState, useEffect } from 'react';

import spotifyService from '@/services/spotify';

const useSearch = (query, accessToken) => {
	const [topResult, setTopResult] = useState(null);
	const [albums, setAlbums] = useState([]);
	const [tracks, setTracks] = useState([]);
	const [artists, setArtists] = useState([]);
	const [playlists, setPlaylists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const search = async () => {
			setIsLoading(true);
			const results = await spotifyService.search(query, {}, accessToken);
			setTopResult(results?.albums?.items[0]);
			setAlbums(results?.albums?.items);
			setTracks(results?.tracks?.items);
			setArtists(results?.artists?.items);
			setPlaylists(results?.playlists?.items);
			setIsLoading(false);
		};

		if (accessToken) {
			search();
		}
	}, [accessToken]);

	return {
		isLoading,
		topResult,
		albums,
		tracks,
		artists,
		playlists,
	};
};

export default useSearch;
