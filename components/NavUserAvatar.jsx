import React from 'react';

import DefaultUserImage from './DefaultUserImage';

const NavUserAvatar = ({ user }) => {
	return (
		<>
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
							onClick={() => {
								alert('This is a test.');
							}}
							displayName={user.display_name}
							className="outline outline-neutral-700 outline-4 hover:scale-105 hover:cursor-pointer"
						/>
					</div>
				</>
			)}
		</>
	);
};

export default NavUserAvatar;
