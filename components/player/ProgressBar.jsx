import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import usePlayerStore from '@/stores/playerStore';

const ProgressBar = () => {
	const {
		deviceId,
		duration,
		progress,
		setProgress,
		setIsSeeking,
		playbackState,
		player,
	} = usePlayerStore();

	const handleSeek = (e) => {
		const newPosition = e.target.value;
		setProgress(newPosition);
		setIsSeeking(true);
		player.seek(newPosition);
		// setIsSeeking(false);
	};

	return (
		<div className="flex justify-center items-center gap-2">
			<span className="font-copy text-xs text-gray-300">
				{dayjs.duration(progress, 'milliseconds').format('m:ss')}
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
				{dayjs.duration(duration, 'milliseconds').format('m:ss')}
			</span>
		</div>
	);
};

export default ProgressBar;
