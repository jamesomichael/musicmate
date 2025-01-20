import React from 'react';

const Playlist = async ({ params }) => {
	const { id } = await params;
	return <div>Playlist {id}</div>;
};

export default Playlist;
