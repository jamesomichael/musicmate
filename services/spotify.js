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

module.exports = {
	fetchCurrentUser,
	fetchUserPlaylists,
	transferPlayback,
	fetchPlaybackState,
};
