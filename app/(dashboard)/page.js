'use client';
import UserTopItems from '@/components/UserTopItems';
import SuggestionsGrid from '@/components/SuggestionsGrid';
import RecentlyPlayed from '@/components/RecentlyPlayed';

const Home = () => {
	return (
		<div className="flex flex-col">
			<div className="h-fit bg-gradient-to-b from-neutral-700 to-spotify-black">
				<SuggestionsGrid />
			</div>
			<div className="flex flex-col gap-6 p-6">
				<RecentlyPlayed />
				<UserTopItems />
			</div>
		</div>
	);
};

export default Home;
