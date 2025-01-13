import axios from 'axios';

const fetchCurrentUser = async (accessToken) => {
	try {
		const response = await axios.get('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		return false;
	}
};

module.exports = { fetchCurrentUser };
