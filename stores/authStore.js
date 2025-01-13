import { create } from 'zustand';

const useAuthStore = create((set) => ({
	isAuthorised: false,
	username: null,
	token: null,
	error: null,

	setIsAuthorised: (isAuthorised) => set({ isAuthorised }),
	setUsername: (username) => set({ username }),
	setToken: (token) => set({ token }),
}));

export default useAuthStore;
