'use client';
import { useParams } from 'next/navigation';
import React from 'react';

const Artist = () => {
	const { id } = useParams();
	return <div>Artist {id}</div>;
};

export default Artist;
