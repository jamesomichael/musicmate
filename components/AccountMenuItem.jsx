import React from 'react';
import Link from 'next/link';

const AccountMenuItem = ({
	children,
	href,
	onClick,
	icon,
	openInNewTab = false,
}) => {
	return (
		<div
			className={`px-3 h-11 w-full flex items-center rounded hover:bg-neutral-500 ${
				href ? 'cursor-pointer' : ''
			}`}
			onClick={onClick}
		>
			{href ? (
				<Link
					href={href}
					target={openInNewTab ? '_blank' : '_self'}
					className="w-full flex justify-between items-center"
				>
					<span>{children}</span>
					{icon && <div>{icon}</div>}
				</Link>
			) : (
				<span>{children}</span>
			)}
		</div>
	);
};

export default AccountMenuItem;
