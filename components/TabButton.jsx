import React from 'react';

import useLibraryStore from '@/stores/libraryStore';

const TabButton = ({ type }) => {
	const { activeTab, setActiveTab } = useLibraryStore();

	return (
		<span
			onClick={() => setActiveTab(type)}
			className={`hover:cursor-pointer capitalize rounded-full px-3 py-1 ${
				activeTab === type
					? 'bg-white hover:bg-opacity-90 text-black'
					: 'bg-neutral-700 text-gray-200 hover:bg-neutral-600'
			}`}
		>
			{type}
		</span>
	);
};

export default TabButton;
