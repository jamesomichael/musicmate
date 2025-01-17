'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="flex gap-4">
				{[...Array(3)].map((_, index) => (
					<motion.span
						key={index}
						className="w-2 h-2 bg-white rounded-full"
						initial={{ scale: 1 }}
						animate={{ scale: 2 }}
						transition={{
							duration: 0.75,
							repeat: Infinity,
							repeatType: 'mirror',
							delay: index * 0.2,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Loader;
