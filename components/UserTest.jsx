'use client';
import React, { useEffect } from 'react';

import useUserStore from '@/stores/userStore';

const UserTest = ({ user }) => {
	const { displayName, setUserData } = useUserStore();

	useEffect(() => {
		setUserData(user);
	}, [setUserData]);

	return <div>{displayName}</div>;
};

export default UserTest;
