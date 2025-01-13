import { create } from 'zustand';

const useAuthStore = create((set) => ({
	isAuthorised: 'false',
	username: null,
	accessToken: null,
	refreshToken: null,
	error: null,

	setIsAuthorised: (isAuthorised) => set({ isAuthorised }),
	setUsername: (username) => set({ username }),
	setTokens: ({ accessToken, refreshToken }) =>
		set({ accessToken, refreshToken }),
}));

export default useAuthStore;
