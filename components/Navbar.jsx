import React from 'react';
import Link from 'next/link';

import { GrHomeRounded } from 'react-icons/gr';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const Navbar = ({ user }) => {
	return (
		<div className="h-full bg-black grid grid-cols-3 items-center">
			<div>Back</div>
			<div className="h-full py-2 flex justify-center items-center gap-1">
				<div className="h-full aspect-square rounded-full bg-neutral-800 flex justify-center items-center text-gray-300 hover:scale-105 hover:cursor-pointer">
					<GrHomeRounded size={18} />
				</div>
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
			</div>
			<div className="flex justify-end items-center">{user.email}</div>
		</div>
	);
};

export default Navbar;
