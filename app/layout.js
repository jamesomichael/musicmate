import './globals.css';

export const metadata = {
	title: 'musicmate',
	description: 'musicmate',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={
					'antialiased overflow-auto min-h-screen h-screen w-full'
				}
			>
				{children}
			</body>
		</html>
	);
}
