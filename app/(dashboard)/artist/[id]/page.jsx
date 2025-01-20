import React from 'react';

const Artist = async ({ params }) => {
	const { id } = await params;
	return <div>Artist {id}</div>;
};

export default Artist;
