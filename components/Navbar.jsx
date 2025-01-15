'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DefaultUserImage from './DefaultUserImage';

import { GrHomeRounded } from 'react-icons/gr';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Navbar = ({ user }) => {
	const router = useRouter();
	const [canNavigateBack, setCanNavigateBack] = useState(false);
	const [canNavigateForward, setCanNavigateForward] = useState(false);

	useEffect(() => {
		const checkHistory = () => {
			setCanNavigateBack(window.history.length > 1);
			setCanNavigateForward(window.history.length > 1);
		};

		checkHistory();
		window.addEventListener('popstate', checkHistory);

		return () => {
			window.removeEventListener('popstate', checkHistory);
		};
	}, []);

	return (
		<div className="h-full bg-black grid grid-cols-3 items-center">
			<div className="p-2 flex justify-start items-center">
				<IoIosArrowBack
					onClick={() => {
						router.back();
					}}
					size={30}
					className={`${
						canNavigateBack
							? 'text-gray-300 hover:text-white cursor-pointer'
							: 'opacity-50 cursor-not-allowed'
					}`}
				/>
				<IoIosArrowForward
					onClick={() => {
						router.forward();
					}}
					size={30}
					className={`${
						canNavigateForward
							? 'text-gray-300 hover:text-white cursor-pointer'
							: 'opacity-50 cursor-not-allowed'
					}`}
				/>
			</div>
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
			<div className="flex justify-end items-center h-full p-2">
				{user.images?.length > 0 ? (
					<div
						className="bg-cover bg-center h-full aspect-square rounded-full outline outline-neutral-700 outline-4 hover:scale-105 hover:cursor-pointer"
						style={{
							backgroundImage: `url(${user.images[0].url})`,
						}}
					></div>
				) : (
					<>
						<div className="h-full">
							<DefaultUserImage
								onClick={() => {
									alert('This is a test.');
								}}
								displayName={user.display_name}
								className="outline outline-neutral-700 outline-4 hover:scale-105 hover:cursor-pointer"
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
