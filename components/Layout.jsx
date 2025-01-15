import React from 'react';

import Navbar from './Navbar';
import Player from './Player';

const Layout = ({ children }) => {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<div className="md:p-0 md:m-4 overflow-auto">{children}</div>
			<div className="w-full">
				<Player />
			</div>
		</div>
	);
};

export default Layout;
