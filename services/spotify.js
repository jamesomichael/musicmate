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

const fetchUserPlaylists = async (accessToken) => {
	console.log("[fetchUserPlaylists] Fetching the user's playlists...");
	try {
		const response = await axios.get(
			'https://api.spotify.com/v1/me/playlists',
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

module.exports = { fetchCurrentUser, fetchUserPlaylists };
