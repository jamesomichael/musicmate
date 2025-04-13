'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { transferPlayback, fetchPlaybackState } from '@/services/spotify';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import {
	FaCirclePause,
	FaCirclePlay,
	FaBackwardStep,
	FaForwardStep,
	FaVolumeHigh,
} from 'react-icons/fa6';

import usePlayerStore from '@/stores/playerStore';
import FadeInSlide from '../shared/FadeInSlide';
import FadeIn from '../shared/FadeIn';

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
		duration,
		setDuration,
		progress,
		setProgress,
		isSeeking,
		setIsSeeking,
	} = usePlayerStore();

	const getPlaybackState = async () => {
		const state = await fetchPlaybackState(accessToken);
		setPlaybackState(state);
		setDuration(state.item?.duration_ms);
	};

	useEffect(() => {
		if (
			playbackState &&
			playbackState.is_playing &&
			playbackState.device.id !== deviceId &&
			!isSeeking
		) {
			const interval = setInterval(() => {
				setProgress(playbackState.progress_ms);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [playbackState, isSeeking]);

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
					setDuration(state.track_window.current_track.duration_ms);
					setProgress(state.position);
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

	const handleSeek = (e) => {
		const newPosition = e.target.value;
		setProgress(newPosition);
		setIsSeeking(true);
		player.seek(newPosition);
	};

	const handleTransferToPlayer = () => {
		transferPlayback(deviceId, accessToken);
	};

	return playbackState && playbackState.item && isReady ? (
		<div
			key={playbackState.item}
			className="h-full grid grid-rows-[1fr,auto]"
		>
			<div className="bg-black px-4 h-20 grid grid-cols-3">
				<div className="flex gap-2 py-2">
					<Link href={`/album/${playbackState.item.album.id}`}>
						<FadeIn
							key={playbackState.item.album.images[0].url}
							className="rounded h-full aspect-square bg-center bg-cover"
							style={{
								backgroundImage: `url(${playbackState.item.album.images[0].url})`,
							}}
						></FadeIn>
					</Link>
					<div className="flex flex-col justify-center w-full">
						<FadeInSlide
							key={playbackState.item.name}
							href={`/album/${playbackState.item.album.id}`}
							className="text-sm font-heading line-clamp-1 leading-6"
						>
							{playbackState.item.name}
						</FadeInSlide>

						<div className="flex">
							{playbackState.item.artists.map(
								(artist, index, array) => (
									<FadeIn
										className="font-copy text-xs text-gray-300"
										key={artist.id}
										href={`/artist/${artist.id}`}
									>
										<span>{artist.name}</span>
										{index < array.length - 1 && (
											<span className="text-gray-400">
												&nbsp;•&nbsp;
											</span>
										)}
									</FadeIn>
								)
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-1 justify-center items-cente w-full">
					<div className="flex justify-center items-center gap-7">
						<div onClick={handlePreviousTrack}>
							<FaBackwardStep
								className="cursor-pointer text-gray-300 hover:text-white"
								size={20}
							/>
						</div>
						<div>
							{playbackState.is_playing ? (
								<>
									<FaCirclePause
										className="cursor-pointer hover:scale-105 hover:opacity-90"
										onClick={handlePlayPause}
										size={35}
									/>
								</>
							) : (
								<>
									<FaCirclePlay
										className="cursor-pointer hover:scale-105 hover:opacity-90"
										onClick={handlePlayPause}
										size={35}
									/>
								</>
							)}
						</div>
						<div onClick={handleNextTrack}>
							<FaForwardStep
								className="cursor-pointer text-gray-300 hover:text-white"
								size={20}
							/>
						</div>
					</div>

					<div className="flex justify-center items-center gap-2">
						<span className="font-copy text-xs text-gray-300">
							{dayjs
								.duration(progress, 'milliseconds')
								.format('m:ss')}
						</span>
						<div className="progress-bar-container">
							<input
								type="range"
								min="0"
								max={duration}
								value={progress}
								onChange={
									playbackState.device.id === deviceId
										? handleSeek
										: () => {}
								}
								className={`progress-bar ${
									playbackState.device.id !== deviceId &&
									'opacity-50 cursor-not-allowed'
								}`}
							/>
						</div>
						<span className="font-copy text-xs text-gray-300">
							{dayjs
								.duration(duration, 'milliseconds')
								.format('m:ss')}
						</span>
					</div>
				</div>
				{/* <div className="flex justify-end items-center">
					<span>Queue</span>
					<span>Transfer Playback</span>
					<span>Volume</span>
				</div> */}
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
	) : playbackState &&
	  playbackState.currently_playing_type === 'episode' &&
	  isReady ? (
		<>
			<div className="bg-black px-4 h-20 flex justify-start items-center">
				<span className="font-heading">
					Podcasts are not supported currently.
				</span>
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
		</>
	) : (
		<></>
	);
};

export default Player;
