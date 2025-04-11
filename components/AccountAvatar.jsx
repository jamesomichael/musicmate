import React, { useEffect, useRef } from 'react';

import AccountMenu from './AccountMenu';
import DefaultUserImage from './DefaultUserImage';

import useToggle from '@/hooks/useToggle';

const AccountAvatar = ({ user }) => {
	const {
		value: isDropdownOpen,
		toggle: toggleDropdown,
		setOff: closeDropdown,
	} = useToggle(false);
	const dropdownRef = useRef(null);

	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target)
		) {
			closeDropdown();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="h-full relative" ref={dropdownRef}>
			{user.images?.length > 0 ? (
				<div
					onClick={toggleDropdown}
					className="bg-cover bg-center h-full aspect-square rounded-full outline outline-neutral-700 outline-4 hover:scale-105 hover:cursor-pointer"
					style={{
						backgroundImage: `url(${user.images[0].url})`,
					}}
				></div>
			) : (
				<>
					<div className="h-full">
						<DefaultUserImage
							onClick={toggleDropdown}
							displayName={user.display_name}
							className="outline outline-neutral-700 outline-2 hover:scale-105 hover:cursor-pointer"
						/>
					</div>
				</>
			)}
			{isDropdownOpen && <AccountMenu closeDropdown={toggleDropdown} />}
		</div>
	);
};

export default AccountAvatar;
