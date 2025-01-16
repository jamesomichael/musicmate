'use client';
import React from 'react';
import Link from 'next/link';

import Navigation from './Navigation';

import Search from './Search';
import HomeButton from './HomeButton';
import NavUserAvatar from './NavUserAvatar';

const Navbar = ({ user }) => {
	return (
		<div className="h-full bg-black grid grid-cols-3 items-center">
			<div className="p-2 flex justify-start items-center">
				<Navigation />
			</div>
			<div className="h-full py-2 flex justify-center items-center gap-1">
				<HomeButton />
				<Search />
			</div>
			<div className="flex justify-end items-center h-full p-2">
				<NavUserAvatar user={user} />
			</div>
		</div>
	);
};

export default Navbar;
