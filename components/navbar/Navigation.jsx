import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Navigation = () => {
	const router = useRouter();
	const [canNavigateBack, setCanNavigateBack] = useState(false);
	const [canNavigateForward, setCanNavigateForward] = useState(false);

	useEffect(() => {
		const checkHistory = () => {
			setCanNavigateBack(window.history.length > 1);
			setCanNavigateForward(window.history.length > 1);
		};

		checkHistory();
		window.addEventListener('popstate', checkHistory);

		return () => {
			window.removeEventListener('popstate', checkHistory);
		};
	}, []);

	return (
		<>
			<IoIosArrowBack
				onClick={() => {
					router.back();
				}}
				size={30}
				className={`${
					canNavigateBack
						? 'text-gray-300 hover:text-white cursor-pointer'
						: 'opacity-50 cursor-not-allowed'
				}`}
			/>
			<IoIosArrowForward
				onClick={() => {
					router.forward();
				}}
				size={30}
				className={`${
					canNavigateForward
						? 'text-gray-300 hover:text-white cursor-pointer'
						: 'opacity-50 cursor-not-allowed'
				}`}
			/>
		</>
	);
};

export default Navigation;
