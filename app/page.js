import { cookies } from 'next/headers';

import UserTest from '@/components/UserTest';
import Layout from '@/components/Layout';

import spotifyService from '@/services/spotify';

const Home = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token').value;
	const user = await spotifyService.fetchCurrentUser(accessToken);
	return (
		<Layout>
			<div className="bg-blue-200">
				<UserTest user={user} />
				<div className="text-6xl">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Odit maiores ad assumenda veritatis molestiae esse
					dignissimos, soluta debitis voluptatum dolor! Repudiandae
					perferendis deserunt et ullam quaerat architecto facere hic?
					Eum.
				</div>
			</div>
		</Layout>
	);
};

export default Home;
