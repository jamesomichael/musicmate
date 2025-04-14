import React from 'react';

import {
	FaCirclePause,
	FaCirclePlay,
	FaBackwardStep,
	FaForwardStep,
} from 'react-icons/fa6';

import usePlayerStore from '@/stores/playerStore';

const PlaybackControls = () => {
	const { playbackState } = usePlayerStore();

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
		<div className="flex justify-center items-center gap-7">
			<div onClick={handlePreviousTrack}>
				<FaBackwardStep
					className="cursor-pointer text-gray-300 hover:text-white"
					size={20}
				/>
			</div>
			<div>
				{playbackState.is_playing ? (
					<FaCirclePause
						className="cursor-pointer hover:scale-105 hover:opacity-90"
						onClick={handlePlayPause}
						size={35}
					/>
				) : (
					<FaCirclePlay
						className="cursor-pointer hover:scale-105 hover:opacity-90"
						onClick={handlePlayPause}
						size={35}
					/>
				)}
			</div>
			<div onClick={handleNextTrack}>
				<FaForwardStep
					className="cursor-pointer text-gray-300 hover:text-white"
					size={20}
				/>
			</div>
		</div>
	);
};

export default PlaybackControls;
