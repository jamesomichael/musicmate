'use client';
import React, { useEffect } from 'react';
import useLibraryStore from '@/stores/libraryStore';

import TabButton from './TabButton';

import { LuSquareLibrary } from 'react-icons/lu';
// import Loader from './Loader';

const LibraryPanel = ({ accessToken }) => {
	const { isLoading, activeTab, playlists, setPlaylists } = useLibraryStore();

	useEffect(() => {
		setPlaylists(accessToken);
	}, [setPlaylists]);

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
					<TabButton type="artists" />
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
										<span className="font-copy text-gray-200 line-clamp-1">
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
						<></>
					) : activeTab === 'artists' ? (
						<></>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default LibraryPanel;
