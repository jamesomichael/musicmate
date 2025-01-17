'use client';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useLibraryStore from '@/stores/libraryStore';

import TabButton from './TabButton';

import { LuSquareLibrary } from 'react-icons/lu';
// import Loader from './Loader';

dayjs.extend(relativeTime);

const LibraryPanel = ({ accessToken }) => {
	const {
		isLoading,
		activeTab,
		playlists,
		setPlaylists,
		albums,
		setAlbums,
		likedSongs,
		setLikedSongs,
	} = useLibraryStore();

	useEffect(() => {
		setPlaylists(accessToken);
		setAlbums(accessToken);
		setLikedSongs(accessToken);
	}, [setPlaylists, setAlbums, setLikedSongs]);

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
					<TabButton type="songs" />
					{/* <TabButton type="songs" /> */}
				</div>
			</div>
			<div className="overflow-y-scroll">
				<div className="flex flex-col gap-1">
					{isLoading ? (
						<div className="">Loading...</div>
					) : activeTab === 'playlists' ? (
						playlists.map((playlist) => {
							return (
								<div
									key={playlist.id}
									className="rounded min-h-10 grid grid-cols-[auto_1fr] gap-2 items-center p-2"
								>
									{playlist.images?.length > 0 ? (
										<div
											className="rounded bg-center bg-cover h-12 aspect-square"
											style={{
												backgroundImage: `url(${playlist.images[0].url})`,
											}}
										></div>
									) : (
										<div>No image</div>
									)}
									<div className="flex flex-col gap-0.5 justify-center items-start">
										<span className="font-heading text-sm text-gray-200 line-clamp-1">
											{playlist.name}
										</span>
										<span className="text-xs font-copy text-gray-300 line-clamp-1">
											{playlist.owner.display_name}
										</span>
									</div>
								</div>
							);
						})
					) : activeTab === 'albums' ? (
						albums.map(({ album }) => {
							return (
								<div
									key={album.id}
									className="rounded min-h-10 grid grid-cols-[auto_1fr] gap-2 items-center p-2"
								>
									{album.images?.length > 0 ? (
										<div
											className="rounded bg-center bg-cover h-12 aspect-square"
											style={{
												backgroundImage: `url(${album.images[0].url})`,
											}}
										></div>
									) : (
										<div>No image</div>
									)}
									<div className="flex flex-col gap-0.5 justify-center items-start">
										<span className="font-heading text-sm text-gray-200 line-clamp-1">
											{album.name}
										</span>
										<span className="text-xs font-copy text-gray-300 line-clamp-1">
											{album.album_type !== 'album' &&
												`${album.album_type} `}
											{album.artists[0].name}
										</span>
									</div>
								</div>
							);
						})
					) : activeTab === 'songs' ? (
						likedSongs.map(({ track, added_at }) => {
							return (
								// <></>
								<div
									key={track?.id}
									className="rounded min-h-10 grid grid-cols-[auto_1fr] gap-2 items-center p-2"
								>
									{track?.album?.images?.length > 0 ? (
										<div
											className="rounded bg-center bg-cover h-12 aspect-square"
											style={{
												backgroundImage: `url(${track.album.images[0].url})`,
											}}
										></div>
									) : (
										<div>No image</div>
									)}
									<div className="flex flex-col gap-0.5 justify-center items-start">
										<span className="font-heading text-sm text-gray-200 line-clamp-1">
											{track?.name}
										</span>
										<span className="text-xs font-copy text-gray-300 line-clamp-1">
											{track.artists[0]?.name}
										</span>
										{/* <span className="text-xs font-medium font-copy text-gray-400 line-clamp-1">
											{dayjs(added_at).fromNow()}
										</span> */}
									</div>
								</div>
							);
						})
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default LibraryPanel;
