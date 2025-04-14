import { useEffect } from 'react';
import { transferPlayback, fetchPlaybackState } from '@/services/spotify';

import usePlayerStore from '@/stores/playerStore';
import useAuthStore from '@/stores/authStore';

const useSpotifyPlayer = () => {
	const { accessToken } = useAuthStore();
	const {
		setDeviceId,
		player,
		setPlayer,
		setIsReady,
		setPlaybackState,
		setDuration,
		setProgress,
	} = usePlayerStore();

	const getPlaybackState = async () => {
		if (accessToken) {
			const state = await fetchPlaybackState(accessToken);
			setPlaybackState(state);
			setDuration(state.item?.duration_ms);
		}
	};

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;
		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const spotifyPlayer = new window.Spotify.Player({
				name: 'musicmate',
				getOAuthToken: (cb) => cb(accessToken),
				volume: 0.5,
			});

			setPlayer(spotifyPlayer);

			spotifyPlayer.addListener('ready', ({ device_id }) => {
				setDeviceId(device_id);
				setIsReady(true);
			});

			spotifyPlayer.addListener('player_state_changed', (state) => {
				if (state) {
					setDuration(state.track_window.current_track.duration_ms);
					setProgress(state.position);
					setPlaybackState(state);
				}
			});

			spotifyPlayer.addListener('initialization_error', ({ message }) =>
				console.error('[Player] Initialization error:', message)
			);

			spotifyPlayer.addListener('authentication_error', ({ message }) =>
				console.error('[Player] Authentication error:', message)
			);

			spotifyPlayer.addListener('account_error', ({ message }) =>
				console.error('[Player] Account error:', message)
			);

			spotifyPlayer.addListener('playback_error', ({ message }) =>
				console.error('[Player] Playback error:', message)
			);

			spotifyPlayer.connect();
		};

		getPlaybackState();
		const intervalId = setInterval(() => {
			getPlaybackState();
		}, 5000);

		return () => {
			clearInterval(intervalId);
			if (player) {
				player.disconnect();
			}
			document.body.removeChild(script);
		};
	}, [accessToken]);
};

export default useSpotifyPlayer;
