import React from 'react';

import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const Search = () => {
	return (
		<div className="h-full relative group">
			<label
				htmlFor="search"
				className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300 group-hover:text-white group-hover:cursor-pointer"
			>
				<HiMiniMagnifyingGlass size={25} />
			</label>
			<input
				id="search"
				placeholder="What do you want to play?"
				className="rounded-full bg-neutral-800 h-full w-96 pl-11 font-copy text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent group-hover:bg-neutral-700"
				type="text"
			/>
		</div>
	);
};

export default Search;
