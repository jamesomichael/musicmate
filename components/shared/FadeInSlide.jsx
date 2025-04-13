'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FadeInSlide = ({
	children,
	className,
	href,
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
			{href ? (
				<Link className="hover:underline" href={href}>
					{children}
				</Link>
			) : (
				children
			)}
		</motion.div>
	);
};

export default FadeInSlide;
