import React from 'react';

import Navbar from './Navbar';
import Player from './Player';

const Layout = ({ children }) => {
	return (
		<div className="flex flex-col max-h-full h-full">
			<div className="h-14">
				<Navbar />
			</div>
			<div className="md:p-0 md:m-4 pb-40 flex-1 bg-yellow-300 overflow-hidden">
				{children}
			</div>
			<div className="h-16 fixed bottom-0 md:relative w-full">
				<Player />
			</div>
		</div>
	);
};

export default Layout;
