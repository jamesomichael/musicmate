import { create } from 'zustand';

import useAuthStore from './authStore';

import spotifyService from '@/services/spotify';

const usePlayerStore = create((set, get) => ({
	deviceId: null,
	isReady: false,
	player: null,
	nextTracks: [],
	duration: 0,
	progress: 0,
	isSeeking: false,
	playbackState: null,

	setDeviceId: (deviceId) => set({ deviceId }),
	setIsReady: (isReady) => set({ isReady }),
	setPlayer: (player) => set({ player }),
	setPlaybackState: (playbackState) => {
		set({ playbackState });
	},
	setDuration: (duration) => set({ duration }),
	setProgress: (progress) => set({ progress }),
	setIsSeeking: (isSeeking) => set({ isSeeking }),
	play: async ({ offsetPosition, offsetUri, contextUri, deviceId }) => {
		await spotifyService.play(
			{
				deviceId: get().deviceId,
				offset: {
					...(offsetUri && { uri: offsetUri }),
					...(typeof offsetPosition !== 'undefined' && {
						position: offsetPosition,
					}),
				},
				...(contextUri && { contextUri }),
			},
			useAuthStore.getState().accessToken
		);
	},
}));

export default usePlayerStore;
