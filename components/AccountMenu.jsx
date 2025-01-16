import React from 'react';
import Link from 'next/link';

import AccountMenuItem from './AccountMenuItem';

import { TbExternalLink } from 'react-icons/tb';

const AccountMenu = ({ closeDropdown }) => {
	return (
		<div className="absolute right-0 mt-2.5 w-48 bg-neutral-700 rounded shadow-lg z-[100]">
			<div className="p-1 text-white select-none flex flex-col justify-center items-start font-copy text-sm">
				<AccountMenuItem
					href="https://www.spotify.com/uk/account/overview"
					icon={<TbExternalLink size={20} />}
					openInNewTab
				>
					Account
				</AccountMenuItem>
				<AccountMenuItem
					onClick={() => {
						closeDropdown(true);
					}}
					href="/profile"
				>
					Profile
				</AccountMenuItem>
				<div className="w-full border-t border-neutral-500"></div>
				<AccountMenuItem>Log out</AccountMenuItem>
			</div>
		</div>
	);
};

export default AccountMenu;
