import { useState, useEffect } from 'react';

import spotifyService from '@/services/spotify';

import fetchPaginatedData from '@/utils/fetchPaginatedData';

const useArtist = (id, accessToken) => {
	const [artist, setArtist] = useState(null);
	const [artistAlbums, setArtistAlbums] = useState([]);
	const [topTracks, setTopTracks] = useState([]);
	const [isLoadingArtist, setIsLoadingArtist] = useState(true);
	const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);
	const [isLoadingTopTracks, setIsLoadingTopTracks] = useState(true);

	useEffect(() => {
		const fetchArtist = async () => {
			try {
				const data = await spotifyService.fetchArtistById(
					id,
					accessToken
				);
				setArtist(data);
				setIsLoadingArtist(false);
			} catch (error) {
				console.error('Error fetching artist:', error.message);
			}
		};

		const fetchArtistAlbums = async () => {
			try {
				const data = await fetchPaginatedData(
					spotifyService.fetchArtistAlbums,
					id,
					accessToken
				);
				setArtistAlbums(data);
				setIsLoadingAlbums(false);
			} catch (error) {
				console.error('Error fetching artist albums:', error.message);
			}
		};

		const fetchTopTracks = async () => {
			try {
				const { tracks } = await spotifyService.fetchArtistTopTracks(
					id,
					accessToken
				);
				setTopTracks(tracks);
				setIsLoadingTopTracks(false);
			} catch (error) {
				console.error('Error fetching top tracks:', error.message);
			}
		};

		if (accessToken) {
			fetchArtist();
			fetchArtistAlbums();
			fetchTopTracks();
		}
	}, [id, accessToken]);

	return {
		artist,
		artistAlbums,
		topTracks,
		isLoadingArtist,
		isLoadingAlbums,
		isLoadingTopTracks,
	};
};

export default useArtist;
