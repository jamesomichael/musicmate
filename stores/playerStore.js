import { create } from 'zustand';

const usePlayerStore = create((set) => ({
	deviceId: null,
	isReady: false,
	player: null,
	nextTracks: [],
	playbackState: null,

	setDeviceId: (deviceId) => set({ deviceId }),
	setIsReady: (isReady) => set({ isReady }),
	setPlayer: (player) => set({ player }),
	setPlaybackState: (playbackState) => {
		set({ playbackState });
	},
}));

export default usePlayerStore;
