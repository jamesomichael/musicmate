'use client';
import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({
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
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration, delay }}
			{...props}
		>
			{children}
		</motion.div>
	);
};

export default FadeIn;
