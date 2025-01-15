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
			<div className="grid grid-cols-[auto_1fr] h-full gap-4">
				<div className="bg-blue-300 overflow-y-auto h-full w-80">
					LibraryPanel
				</div>
				<div className="bg-blue-300 text-6xl overflow-y-scroll h-full">
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

			{/* <div className="bg-blue-200 h-full">
				<div className="grid grid-cols-[auto_1fr] gap-2 h-full">
					<div className="bg-blue-300 h-full">Sidebar</div>
					<div className="bg-blue-300 text-6xl h-full overflow-y-auto">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Odit maiores ad assumenda veritatis molestiae esse
						dignissimos, soluta debitis voluptatum dolor!
						Repudiandae perferendis deserunt et ullam quaerat
						architecto facere hic? Eum. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Odit maiores ad assumenda
						veritatis molestiae esse dignissimos, soluta debitis
						voluptatum dolor! Repudiandae perferendis deserunt et
						ullam quaerat architecto facere hic? Eum. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Odit
						maiores ad assumenda veritatis molestiae esse
						dignissimos, soluta debitis voluptatum dolor!
						Repudiandae perferendis deserunt et ullam quaerat
						architecto facere hic? Eum. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Odit maiores ad assumenda
						veritatis molestiae esse dignissimos, soluta debitis
						voluptatum dolor! Repudiandae perferendis deserunt et
						ullam quaerat architecto facere hic? Eum. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Odit
						maiores ad assumenda veritatis molestiae esse
						dignissimos, soluta debitis voluptatum dolor!
						Repudiandae perferendis deserunt et ullam quaerat
						architecto facere hic? Eum. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Odit maiores ad assumenda
						veritatis molestiae esse dignissimos, soluta debitis
						voluptatum dolor! Repudiandae perferendis deserunt et
						ullam quaerat architecto facere hic? Eum. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Odit
						maiores ad assumenda veritatis molestiae esse
						dignissimos, soluta debitis voluptatum dolor!
						Repudiandae perferendis deserunt et ullam quaerat
						architecto facere hic? Eum. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Odit maiores ad assumenda
						veritatis molestiae esse dignissimos, soluta debitis
						voluptatum dolor! Repudiandae perferendis deserunt et
						ullam quaerat architecto facere hic? Eum. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Odit
						maiores ad assumenda veritatis molestiae esse
						dignissimos, soluta debitis voluptatum dolor!
						Repudiandae perferendis deserunt et ullam quaerat
						architecto facere hic? Eum. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Odit maiores ad assumenda
						veritatis molestiae esse dignissimos, soluta debitis
						voluptatum dolor! Repudiandae perferendis deserunt et
						ullam quaerat architecto facere hic? Eum. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Odit
						maiores ad assumenda veritatis molestiae esse
						dignissimos, soluta debitis voluptatum dolor!
						Repudiandae perferendis deserunt et ullam quaerat
						architecto facere hic? Eum. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Odit maiores ad assumenda
						veritatis molestiae esse dignissimos, soluta debitis
						voluptatum dolor! Repudiandae perferendis deserunt et
						ullam quaerat architecto facere hic? Eum. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Odit
						maiores ad assumenda veritatis molestiae esse
						dignissimos, soluta debitis voluptatum dolor!
						Repudiandae perferendis deserunt et ullam quaerat
						architecto facere hic? Eum.
					</div>
				</div>
			</div> */}
		</Layout>
	);
};

export default Home;
