import axios from 'axios';

const fetchCurrentUser = async (accessToken) => {
	console.log('[fetchCurrentUser] Fetching user...');
	try {
		const response = await axios.get('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log('[fetchCurrentUser] User retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchCurrentUser] Unable to fetch user:',
			error.message
		);
		return false;
	}
};

const fetchUserTopTracks = async (accessToken) => {
	console.log('[fetchUserTopTracks] Fetching top tracks...');
	try {
		const response = await axios.get(
			'https://api.spotify.com/v1/me/top/tracks?time_range=long_term',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchUserTopTracks] Top tracks retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchUserTopTracks] Unable to fetch top tracks:',
			error.message
		);
		return false;
	}
};

const fetchUserTopArtists = async (accessToken) => {
	console.log('[fetchUserTopArtists] Fetching top artists...');
	try {
		const response = await axios.get(
			'https://api.spotify.com/v1/me/top/artists?time_range=long_term',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchUserTopArtists] Top artists retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchUserTopArtists] Unable to fetch top artists:',
			error.message
		);
		return false;
	}
};

const fetchUserPlaylists = async ({ limit = 50, offset = 0 }, accessToken) => {
	console.log("[fetchUserPlaylists] Fetching the user's playlists...");
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchUserPlaylists] Playlists retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchUserPlaylists] Unable to fetch playlists:',
			error.message
		);
		return false;
	}
};

const fetchUserAlbums = async ({ limit = 50, offset = 0 }, accessToken) => {
	console.log("[fetchUserAlbums] Fetching the user's albums...");
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchUserAlbums] Albums retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchUserAlbums] Unable to fetch albums:',
			error.message
		);
		return false;
	}
};

const fetchLikedSongs = async ({ limit = 50, offset = 0 }, accessToken) => {
	console.log("[fetchLikedSongs] Fetching the user's liked songs...");
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchLikedSongs] Liked songs retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchLikedSongs] Unable to fetch liked songs:',
			error.message
		);
		return false;
	}
};

const fetchCategories = async ({ limit = 50, offset = 0 }, accessToken) => {
	console.log('[fetchCategories] Fetching categories...');
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/browse/categories?locale=en_GB&limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchCategories] Categories retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchCategories] Unable to fetch categories:',
			error.message
		);
		return false;
	}
};

const transferPlayback = async (deviceId, accessToken) => {
	console.log('[transferPlayback] Attempting to transfer playback...');

	if (!deviceId) {
		console.log('[transferPlayback] No device ID provided.');
	}

	try {
		await axios.put(
			'https://api.spotify.com/v1/me/player',
			{ device_ids: [deviceId], play: true },
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);
		console.log('[transferPlayback] Playback has been transferred.');
	} catch (error) {
		console.error('[transferPlayback] Unable to transfer playback.');
		return false;
	}
};

const fetchPlaybackState = async (accessToken) => {
	console.log('[fetchPlaybackState] Fetching playback state...');
	try {
		const response = await axios.get(
			'https://api.spotify.com/v1/me/player',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		console.log('[fetchPlaybackState] Playback state retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchPlaybackState] Error fetching playback state:',
			error
		);
		return false;
	}
};

const play = async ({ contextUri, offset, uris, deviceId }, accessToken) => {
	console.log('[play] Playing item...');
	try {
		const response = await axios.put(
			`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
			{
				...(contextUri && { context_uri: contextUri }),
				...(offset && { offset }),
				...(uris && { uris }),
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		console.log('[play] Item is now playing.');
		return true;
	} catch (error) {
		console.error('[play] Error playing:', error);
		return false;
	}
};

const fetchPlaylistById = async (playlistId, accessToken) => {
	console.log('[fetchPlaylistById] Fetching playlist...');
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/playlists/${playlistId}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchPlaylistById] Playlist retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchPlaylistById] Unable to fetch playlist:',
			error.message
		);
		return false;
	}
};

const fetchPlaylistItems = async (
	playlistId,
	{ limit = 50, offset = 0 },
	accessToken
) => {
	console.log('[fetchPlaylistItems] Fetching playlist items...');
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchPlaylistItems] Playlist items retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchPlaylistItems] Unable to fetch playlist items:',
			error.message
		);
		return false;
	}
};

const fetchAlbumById = async (id, accessToken) => {
	console.log('[fetchAlbumById] Fetching album...');
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/albums/${id}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchAlbumById] Album retrieved.');
		return response.data;
	} catch (error) {
		console.error('[fetchAlbumById] Unable to fetch album:', error.message);
		return false;
	}
};

const fetchAlbumTracks = async (
	albumId,
	{ limit = 50, offset = 0 },
	accessToken
) => {
	console.log('[fetchAlbumTracks] Fetching album tracks...');
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchAlbumTracks] Album tracks retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchAlbumTracks] Unable to fetch album tracks:',
			error.message
		);
		return false;
	}
};

const fetchArtistById = async (id, accessToken) => {
	console.log('[fetchArtistById] Fetching artist...');
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/artists/${id}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchArtistById] Artist retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchArtistById] Unable to fetch artist:',
			error.message
		);
		return false;
	}
};

const fetchArtistAlbums = async (
	artistId,
	{ limit = 50, offset = 0 },
	accessToken
) => {
	console.log('[fetchArtistAlbums] Fetching artist albums...');
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/artists/${artistId}/albums?limit=${limit}&offset=${offset}&include_groups=album,single,compilation`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchArtistAlbums] Artist albums retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchArtistAlbums] Unable to fetch artist albums:',
			error.message
		);
		return false;
	}
};

const fetchArtistTopTracks = async (id, accessToken) => {
	console.log(
		`[fetchArtistTopTracks] Fetching top tracks for artist ${id}...`
	);
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/artists/${id}/top-tracks`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[fetchArtistTopTracks] Top tracks retrieved.');
		return response.data;
	} catch (error) {
		console.error(
			'[fetchArtistTopTracks] Unable to fetch top tracks:',
			error.message
		);
		return false;
	}
};

const search = async (query, { limit = 50, offset = 0 }, accessToken) => {
	console.log(`[search] Searching with query ${query}...`);
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/search?q=${query}&type=album,track,artist,playlist`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('[search] Search results retrieved.');
		return response.data;
	} catch (error) {
		console.error('[search] Unable to search:', error.message);
		return false;
	}
};

module.exports = {
	fetchCurrentUser,
	fetchUserTopTracks,
	fetchUserTopArtists,
	fetchUserPlaylists,
	fetchUserAlbums,
	fetchLikedSongs,
	fetchCategories,
	transferPlayback,
	fetchPlaybackState,
	play,
	fetchPlaylistById,
	fetchPlaylistItems,
	fetchAlbumById,
	fetchAlbumTracks,
	fetchArtistById,
	fetchArtistAlbums,
	fetchArtistTopTracks,
	search,
};
