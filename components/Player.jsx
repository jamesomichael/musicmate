'use client';
import { useEffect, useState } from 'react';
import { transferPlayback } from '@/services/spotify';

const Player = ({ accessToken }) => {
	const [player, setPlayer] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [currentTrack, setCurrentTrack] = useState(null); // To store track details

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
				console.log('[Player] Ready with device ID:', device_id);
				setIsReady(true);

				// transferPlayback(device_id, accessToken);
			});

			spotifyPlayer.addListener('not_ready', ({ device_id }) => {
				console.log(
					`[Player] Device ID '${device_id}' has gone offline.`
				);
			});

			spotifyPlayer.addListener('player_state_changed', (state) => {
				if (state) {
					console.log('[Player] Player state changed:', state);

					const track = state.track_window.current_track;
					setCurrentTrack({
						...track,
						//   name: track.name,
						//   artists: track.artists,
						//   albumArt: track.album.images[0].url,
					});
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

		return () => {
			if (player) {
				player.disconnect();
			}
			document.body.removeChild(script);
		};
	}, [accessToken]);

	const handlePlayPause = async () => {
		const state = await player.getCurrentState();
		if (!state) {
			return;
		}

		if (state.paused) {
			player.resume();
		} else {
			player.pause();
		}
	};

	const handleNextTrack = () => {
		player.nextTrack();
	};

	const handlePreviousTrack = () => {
		player.previousTrack();
	};

	return (
		<div className="player h-full">
			{isReady && currentTrack ? (
				<div className="grid grid-cols-3 h-full">
					<div className="flex h-full">
						<div
							className="h-full aspect-square bg-center bg-cover"
							style={{
								backgroundImage: `url(${currentTrack.album.images[0].url})`,
							}}
						></div>
						<span className="font-heading">
							{currentTrack.name}
						</span>
					</div>
					<div>
						<button onClick={handlePreviousTrack}>Previous</button>
						<button onClick={handlePlayPause}>Play/Pause</button>
						<button onClick={handleNextTrack}>Next</button>
					</div>
				</div>
			) : (
				<p>Loading player...</p>
			)}
		</div>
	);
};

export default Player;
