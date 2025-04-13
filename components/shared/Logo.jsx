import React from 'react';

const Logo = ({ className, light = false, dark = false }) => {
	return (
		<span
			className={`select-none leading-none font-heading font-black ${
				light
					? 'text-white'
					: dark
					? 'text-black'
					: 'text-spotify-green'
			} ${className}`}
		>
			music
			<span
				className={`font-light ${
					dark ? 'text-black' : 'text-white'
				} ${className}`}
			>
				mate
			</span>
		</span>
	);
};

export default Logo;
