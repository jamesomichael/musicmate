import '../globals.css';

import Footer from '@/components/shared/Footer';

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body className="select-none antialiased overflow-auto w-full bg-black">
				<div className="min-h-screen h-screen">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
