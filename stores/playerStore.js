import { create } from 'zustand';

const usePlayerStore = create((set) => ({
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
}));

export default usePlayerStore;
