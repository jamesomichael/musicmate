'use client';
import NowPlaying from './NowPlaying';
import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';
import ExternalPlayback from './ExternalPlayback';

import usePlayerStore from '@/stores/playerStore';

import useSpotifyPlayer from '@/hooks/useSpotifyPlayer';
import useExternalPlayback from '@/hooks/useExternalPlayback';

const Player = () => {
	const { isReady, playbackState, isSeeking } = usePlayerStore();

	useSpotifyPlayer();
	useExternalPlayback();

	if (!isReady || (!playbackState?.item && !isSeeking)) {
		return null;
	}

	if (
		playbackState &&
		playbackState.currently_playing_type === 'episode' &&
		isReady
	) {
		return (
			<>
				<div className="bg-black px-4 h-20 flex justify-start items-center">
					<span className="font-heading">
						Podcasts are not supported currently.
					</span>
				</div>
				<ExternalPlayback />
			</>
		);
	}

	return (
		playbackState &&
		playbackState.item &&
		isReady && (
			<div
				// key={playbackState.item}
				className="h-full grid grid-rows-[1fr,auto]"
			>
				<div className="bg-black px-4 h-20 grid grid-cols-3">
					<NowPlaying />
					<div className="flex flex-col gap-1 justify-center w-full">
						<PlaybackControls />
						<ProgressBar />
					</div>
				</div>

				<ExternalPlayback />
			</div>
		)
	);
};

export default Player;
