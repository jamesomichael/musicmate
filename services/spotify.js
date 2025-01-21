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
		console.log('response.data', response.data);
		return response.data;
	} catch (error) {
		console.error(
			'[fetchPlaylistById] Unable to fetch playlist:',
			error.message
		);
		return false;
	}
};

module.exports = {
	fetchCurrentUser,
	fetchUserPlaylists,
	fetchUserAlbums,
	fetchLikedSongs,
	fetchCategories,
	transferPlayback,
	fetchPlaybackState,
	play,
	fetchPlaylistById,
};
