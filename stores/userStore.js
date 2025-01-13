import { create } from 'zustand';

const useUserStore = create((set) => ({
	id: null,
	country: null,
	email: null,
	displayName: null,
	externalUrl: null,
	followers: null,
	images: [],
	product: null,
	uri: null,
	error: null,

	setUserData: (userData) =>
		set({
			id: userData?.id,
			country: userData?.country,
			email: userData?.email,
			displayName: userData?.display_name,
			externalUrl: userData?.href,
			followers: userData?.followers?.total,
			images: userData?.images,
			product: userData?.product,
			uri: userData?.uri,
		}),
}));

export default useUserStore;
