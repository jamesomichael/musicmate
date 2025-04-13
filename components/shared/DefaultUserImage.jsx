import React from 'react';

import { FaUser } from 'react-icons/fa6';

const DefaultUserImage = ({ displayName, className, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`text-black bg-yellow-900 aspect-square h-full rounded-full flex justify-center items-center ${
				className ? className : ''
			}`}
		>
			{displayName ? (
				<span className="font-copy text-lg font-bold">
					{displayName.charAt(0)}
				</span>
			) : (
				<FaUser />
			)}
		</div>
	);
};

export default DefaultUserImage;
