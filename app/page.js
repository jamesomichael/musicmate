import { cookies } from 'next/headers';

import UserTest from '@/components/UserTest';

import spotifyService from '@/services/spotify';

const Home = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token').value;
	const user = await spotifyService.fetchCurrentUser(accessToken);
	return (
		<div>
			<UserTest user={user} />
		</div>
	);
};

export default Home;
