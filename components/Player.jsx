'use client';
import { useEffect, useState } from 'react';
import { transferPlayback, fetchPlaybackState } from '@/services/spotify';

import {
	FaCirclePause,
	FaCirclePlay,
	FaBackwardStep,
	FaForwardStep,
	FaVolumeHigh,
} from 'react-icons/fa6';

import usePlayerStore from '@/stores/playerStore';

const Player = ({ accessToken }) => {
	const {
		deviceId,
		setDeviceId,
		player,
		setPlayer,
		isReady,
		setIsReady,
		// currentTrack,
		playbackState,
		setPlaybackState,
	} = usePlayerStore();

	const getPlaybackState = async () => {
		const state = await fetchPlaybackState(accessToken);
		setPlaybackState(state);
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
				console.log('[Player] Ready with device ID:', device_id);
				setDeviceId(device_id);
				setIsReady(true);
			});

			spotifyPlayer.addListener('not_ready', ({ device_id }) => {
				console.log(
					`[Player] Device ID '${device_id}' has gone offline.`
				);
			});

			spotifyPlayer.addListener('player_state_changed', (state) => {
				if (state) {
					console.log('[Player] Player state changed:', state);

					// const track = state.track_window.current_track;
					// setCurrentTrack({
					// 	...track,
					// });
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

	const handlePlayPause = async () => {
		const state = await player.getCurrentState();
		console.log('state', state);
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

	const handleTransferToPlayer = () => {
		transferPlayback(deviceId, accessToken);
	};

	return playbackState && isReady ? (
		<div className="h-full grid grid-rows-[1fr,auto]">
			<div className="bg-black px-4 h-20 select-none grid grid-cols-3">
				<div className="flex gap-2 py-2">
					<div
						className="rounded h-full aspect-square bg-center bg-cover"
						style={{
							backgroundImage: `url(${playbackState.item.album.images[0].url})`,
						}}
					></div>
					<div className="flex flex-col justify-center w-full">
						<span className="font-heading line-clamp-1 leading-5">
							{playbackState.item.name}
						</span>
						<div className="flex">
							{playbackState.item.artists.map(
								(artist, index, array) => (
									<div
										className="font-copy text-sm text-gray-300"
										key={artist.id}
									>
										<span>{artist.name}</span>
										{index < array.length - 1 && (
											<span className="text-gray-400">
												&nbsp;•&nbsp;
											</span>
										)}
									</div>
								)
							)}
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center gap-7">
					<div onClick={handlePreviousTrack}>
						<FaBackwardStep
							className="cursor-pointer text-gray-300 hover:text-white"
							size={22}
						/>
					</div>
					<div>
						{playbackState.is_playing ? (
							<>
								<FaCirclePause
									className="cursor-pointer hover:scale-105 hover:opacity-90"
									onClick={handlePlayPause}
									size={40}
								/>
							</>
						) : (
							<>
								<FaCirclePlay
									className="cursor-pointer hover:scale-105 hover:opacity-90"
									onClick={handlePlayPause}
									size={40}
								/>
							</>
						)}
					</div>
					<div onClick={handleNextTrack}>
						<FaForwardStep
							className="cursor-pointer text-gray-300 hover:text-white"
							size={22}
						/>
					</div>
				</div>
				<div></div>
			</div>
			{playbackState.device.id !== deviceId && (
				<div className="px-4 py-1 flex justify-end items-center gap-8 bg-gradient-to-r from-transparent to-spotify-green text-black text-xs font-copy">
					<span className="flex items-center gap-2.5 font-bold">
						<FaVolumeHigh size={15} />
						Playing on {playbackState.device.name}
					</span>
					<button onClick={handleTransferToPlayer}>Play here</button>
				</div>
			)}
		</div>
	) : (
		<></>
		// <div>
		// 	<span>No playback state.</span>
		// </div>
	);
	// <div className="h-full">
	// 	{playbackState?.is_playing &&
	// 	playbackState?.device?.id !== deviceId ? (
	// 		<>
	// 			<pre>{JSON.stringify(playbackState, null, 4)}</pre>
	// 		</>
	// 	) : isReady && currentTrack ? (
	// 		<div className="grid grid-cols-3 h-full">
	// 			<div className="flex h-full">
	// 				<div
	// 					className="h-full aspect-square bg-center bg-cover"
	// 					style={{
	// 						backgroundImage: `url(${currentTrack.album.images[0].url})`,
	// 					}}
	// 				></div>
	// 				<span className="font-heading">
	// 					{currentTrack.name}
	// 				</span>
	// 			</div>
	// 			<div>
	// 				<button onClick={handlePreviousTrack}>Previous</button>
	// 				<button onClick={handlePlayPause}>Play/Pause</button>
	// 				<button onClick={handleNextTrack}>Next</button>
	// 			</div>
	// 		</div>
	// 	) : (
	// 		<>
	// 			<p>No music currently playing.</p>
	// 		</>
	// 	)}
	// </div>
	// );
};

export default Player;
