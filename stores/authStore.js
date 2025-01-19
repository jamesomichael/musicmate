import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
	isAuthorised: 'false',
	username: null,
	accessToken: null,
	refreshToken: null,
	error: null,

	logOut: async () => {
		await axios.post('/api/logout');
	},
	setIsAuthorised: (isAuthorised) => set({ isAuthorised }),
	setUsername: (username) => set({ username }),
	setToken: (accessToken) => set({ accessToken }),
}));

export default useAuthStore;
