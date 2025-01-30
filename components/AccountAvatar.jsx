import React, { useState, useEffect, useRef } from 'react';

import AccountMenu from './AccountMenu';
import DefaultUserImage from './DefaultUserImage';

const AccountAvatar = ({ user }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsDropdownOpen(false);
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
