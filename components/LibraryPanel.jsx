'use client';
import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useLibraryStore from '@/stores/libraryStore';

import TabButton from './TabButton';
import Loader from './Loader';
import LibraryPanelListItem from './LibraryPanelListItem';

import { LuSquareLibrary } from 'react-icons/lu';

dayjs.extend(relativeTime);

const LibraryPanel = ({ accessToken }) => {
	const {
		isLoadingPlaylists,
		isLoadingAlbums,
		isLoadingSongs,
		activeTab,
		playlists,
		setPlaylists,
		albums,
		setAlbums,
		likedSongs,
		setLikedSongs,
	} = useLibraryStore();

	const scrollContainerRef = useRef(null);

	useEffect(() => {
		setPlaylists(accessToken);
		setAlbums(accessToken);
		// setLikedSongs(accessToken);
	}, [accessToken, setPlaylists, setAlbums, setLikedSongs]);

	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTop = 0;
		}
	}, [activeTab]);

	const tabConfig = {
		playlists: {
			isLoading: isLoadingPlaylists,
			data: playlists,
			renderItem: (playlist) => {
				if (playlist.name === 'Liked Songs') {
					return (
						<LibraryPanelListItem
							key={playlist.name}
							imageUrl="/liked-songs-300.jpg"
							primaryText={playlist.name}
							isPinnedItem={true}
							href="/library/songs"
						/>
					);
				} else {
					return (
						<LibraryPanelListItem
							key={playlist.id}
							imageUrl={playlist.images?.[0]?.url}
							primaryText={playlist.name}
							secondaryText={playlist.owner.display_name}
							href={`/playlist/${playlist.id}`}
						/>
					);
				}
			},
		},
		albums: {
			isLoading: isLoadingAlbums,
			data: albums,
			renderItem: ({ album }) => (
				<LibraryPanelListItem
					key={album.id}
					imageUrl={album.images?.[0]?.url}
					primaryText={album.name}
					secondaryText={album.artists[0].name}
					href={`/album/${album.id}`}
				/>
			),
		},
		songs: {
			isLoading: isLoadingSongs,
			data: likedSongs,
			renderItem: ({ track }) => (
				<LibraryPanelListItem
					key={track.id}
					imageUrl={track.album?.images?.[0]?.url}
					primaryText={track.name}
					secondaryText={track.artists[0]?.name}
				/>
			),
		},
	};

	const currentTab = tabConfig[activeTab];

	return (
		<div className="select-none grid grid-rows-[auto_1fr] h-full gap-2">
			<div className="px-2 h-24 grid grid-rows-2 justify-start items-center">
				<div className="flex justify-start items-center gap-2 text-gray-300">
					<LuSquareLibrary size={28} />
					<span className="font-heading font-bold">Your Library</span>
				</div>

				<div className="flex overflow-x-scroll gap-2 text-sm font-copy">
					<TabButton type="playlists" />
					<TabButton type="albums" />
					{/* <TabButton type="songs" /> */}
				</div>
			</div>
			{currentTab?.isLoading ? (
				<div className="h-full flex justify-center items-center">
					<Loader />
				</div>
			) : (
				<div ref={scrollContainerRef} className="overflow-y-scroll">
					<div className="flex flex-col gap-1">
						{currentTab?.data?.map(currentTab.renderItem)}
					</div>
				</div>
			)}
		</div>
	);
};

export default LibraryPanel;
