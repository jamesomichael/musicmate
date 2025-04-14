import { useEffect } from 'react';

import usePlayerStore from '@/stores/playerStore';

const useExternalPlayback = () => {
	const { playbackState, deviceId, isSeeking, setProgress } =
		usePlayerStore();

	const isPlaying =
		playbackState &&
		playbackState.is_playing &&
		playbackState.device.id !== deviceId;

	useEffect(() => {
		if (isPlaying) {
			const interval = setInterval(() => {
				setProgress(playbackState.progress_ms);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [playbackState, deviceId, isSeeking]);

	return { isPlaying };
};

export default useExternalPlayback;
