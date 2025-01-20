import React from 'react';

const Album = async ({ params }) => {
	const { id } = await params;
	return <div>Album {id}</div>;
};

export default Album;
