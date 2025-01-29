import { useState, useEffect } from 'react';

import getDynamicGradient from '@/utils/getDynamicGradient';

const useDynamicGradient = (image) => {
	const defaultGradient = 'linear-gradient(to bottom, #3fbf3f, #3fbf3f)';
	const [gradient, setGradient] = useState(defaultGradient);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (image) {
			const generateGradient = async () => {
				setIsLoading(true);
				const dynamicGradient = await getDynamicGradient(
					image,
					defaultGradient
				);
				setGradient(dynamicGradient);
				setIsLoading(false);
			};
			generateGradient();
		}
	}, [image]);

	return { gradient, isLoading };
};

export default useDynamicGradient;
