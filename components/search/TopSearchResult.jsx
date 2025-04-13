import React from 'react';
import Link from 'next/link';

const TopSearchResult = ({ data }) => {
	return (
		<>
			<span className="font-heading font-bold text-white">
				Top result
			</span>
			<Link
				href={`/album/${data.id}`}
				className="h-64 grid grid-rows-2 gap-2 bg-neutral-900 hover:bg-neutral-800 rounded p-6"
			>
				<div
					className="h-full aspect-square rounded bg-cover bg-center shadow-xl"
					style={{
						backgroundImage: `url(${data.images[0].url})`,
					}}
				></div>
				<div className="flex flex-col gap-2 justify-center">
					<span className="line-clamp-2 font-heading font-bold text-2xl hover:underline">
						{data.name}
					</span>
					<div className="flex gap-1 items-center text-sm font-copy text-gray-400">
						<span className="capitalize">{data.album_type}</span>
						<span className="">•</span>
						<Link
							href={`/artist/${data.artists[0].id}`}
							className="hover:underline text-white"
						>
							{data.artists[0].name}
						</Link>
					</div>
				</div>
			</Link>
		</>
	);
};

export default TopSearchResult;
