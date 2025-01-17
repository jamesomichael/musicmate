'use client';
import React, { useEffect } from 'react';
import useLibraryStore from '@/stores/libraryStore';

import { LuSquareLibrary } from 'react-icons/lu';

const LibraryPanel = ({ accessToken }) => {
	const { playlists, setPlaylists } = useLibraryStore();

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

				<div className="flex gap-2 text-sm font-copy">
					<span className="rounded-full px-3 py-1 bg-neutral-700 text-gray-200">
						Playlists
					</span>
					<span className="rounded-full px-3 py-1 bg-neutral-700 text-gray-200">
						Albums
					</span>
					<span className="rounded-full px-3 py-1 bg-neutral-700 text-gray-200">
						Artists
					</span>
				</div>
			</div>
			<div className="overflow-y-scroll">
				<div className="flex flex-col gap-1">
					{playlists.map((playlist) => {
						return (
							<div
								key={playlist.id}
								className="rounded min-h-10 grid grid-cols-[auto_1fr] gap-2 items-center p-2"
							>
								<div
									className="rounded bg-center bg-cover h-12 aspect-square"
									style={{
										backgroundImage: `url(${playlist.images[0]?.url})`,
									}}
								></div>
								<span className="font-copy text-sm line-clamp-2">
									{playlist.name}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default LibraryPanel;
