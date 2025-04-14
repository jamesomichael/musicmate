import React from 'react';

import { transferPlayback } from '@/services/spotify';

import { FaVolumeHigh } from 'react-icons/fa6';

import useAuthStore from '@/stores/authStore';
import usePlayerStore from '@/stores/playerStore';

const ExternalPlayback = () => {
	const { accessToken } = useAuthStore();
	const { playbackState, deviceId } = usePlayerStore();

	const handleTransferToPlayer = () => {
		if (accessToken && deviceId) {
			transferPlayback(deviceId, accessToken);
		}
	};

	return (
		playbackState.device.id !== deviceId && (
			<div className="px-4 py-1 flex justify-end items-center gap-8 bg-gradient-to-r from-transparent to-spotify-green text-black text-xs font-copy">
				<span className="flex items-center gap-2.5 font-bold">
					<FaVolumeHigh size={15} />
					Playing on {playbackState.device.name}
				</span>
				<button onClick={handleTransferToPlayer}>Play here</button>
			</div>
		)
	);
};

export default ExternalPlayback;
