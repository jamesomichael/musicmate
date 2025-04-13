'use client';
import React, { useEffect } from 'react';

import Navigation from './Navigation';
import Search from '../search/Search';
import HomeButton from './HomeButton';
import AccountAvatar from '../account/AccountAvatar';
import BrowseButton from './BrowseButton';

import useUserStore from '@/stores/userStore';
import useAuthStore from '@/stores/authStore';

const Navbar = ({ accessToken, user }) => {
	const { setToken } = useAuthStore();
	const { setUserData } = useUserStore();

	useEffect(() => {
		setToken(accessToken);
		setUserData(user);
	}, [user, setUserData]);

	return (
		<div className="h-full bg-black grid grid-cols-2 md:grid-cols-[1fr,2fr,1fr] items-center">
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
