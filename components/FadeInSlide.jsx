'use client';
import React from 'react';
import { motion } from 'framer-motion';

const FadeInSlide = ({
	children,
	className,
	delay = 0,
	duration = 0.5,
	x = 50,
	y = 0,
	...props
}) => {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, x, y }}
			animate={{ opacity: 1, x: 0, y: 0 }}
			transition={{ duration, delay }}
			{...props}
		>
			{children}
		</motion.div>
	);
};

export default FadeInSlide;
