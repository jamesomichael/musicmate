'use client';
import UserTopItems from '@/components/library/UserTopItems';
import SuggestionsGrid from '@/components/library/SuggestionsGrid';
import RecentlyPlayed from '@/components/library/RecentlyPlayed';

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
