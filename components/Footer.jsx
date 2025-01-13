import React from 'react';

const Footer = () => {
	return (
		<div className="grid grid-cols-2">
			<div className="flex flex-col m-auto">
				<span>musicmate</span>
				<span>&copy; James Michael, {new Date().getFullYear()}</span>
			</div>
			<div>Test column 2</div>
		</div>
	);
};

export default Footer;
