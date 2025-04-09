import Loader from '@/components/Loader';
import BrowseCategories from '@/components/BrowseCategories';
import UserTopItems from '@/components/UserTopItems';

const Home = async () => {
	return (
		<div className="flex flex-col gap-6 p-6">
			{/* <Loader /> */}
			{/* <BrowseCategories /> */}
			<div className="h-72 bg-neutral-700 rounded">
				<Loader />
			</div>
			<div className="">
				<UserTopItems />
			</div>
		</div>
	);
};

export default Home;
