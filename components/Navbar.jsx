'use client';
import React, { useEffect } from 'react';

import Navigation from './Navigation';

import Search from './Search';
import HomeButton from './HomeButton';
import AccountAvatar from './AccountAvatar';

import useUserStore from '@/stores/userStore';

const Navbar = ({ user }) => {
	const { setUserData } = useUserStore();

	useEffect(() => {
		setUserData(user);
	}, [user, setUserData]);

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
				<AccountAvatar user={user} />
			</div>
		</div>
	);
};

export default Navbar;
