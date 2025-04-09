'use client';
import React, { useEffect } from 'react';

import Navigation from './Navigation';

import Search from './Search';
import HomeButton from './HomeButton';
import AccountAvatar from './AccountAvatar';

import useUserStore from '@/stores/userStore';
import useAuthStore from '@/stores/authStore';
import BrowseButton from './BrowseButton';

const Navbar = ({ accessToken, user }) => {
	const { setToken } = useAuthStore();
	const { setUserData } = useUserStore();

	useEffect(() => {
		setToken(accessToken);
		setUserData(user);
	}, [user, setUserData]);

	return (
		<div className="h-full bg-black grid grid-cols-2 md:grid-cols-3 items-center">
			<div className="p-2 hidden md:flex justify-start items-center">
				<Navigation />
			</div>
			<div className="h-full p-2 flex justify-start md:justify-center items-center gap-1">
				<HomeButton />
				<Search />
				<BrowseButton />
			</div>
			<div className="flex justify-end items-center h-full p-2">
				<AccountAvatar user={user} />
			</div>
		</div>
	);
};

export default Navbar;
