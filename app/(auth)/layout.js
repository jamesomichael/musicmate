import '../globals.css';

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body className="antialiased overflow-auto min-h-screen h-screen w-full bg-black">
				{children}
			</body>
		</html>
	);
}
