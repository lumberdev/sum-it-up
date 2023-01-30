import './globals.css';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ReactQueryWrapper from '~/components/utility-components/ReactQueryWrapper';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body className='flex flex-col justify-between'>
				<ReactQueryWrapper>
					<Header />
					<main className='relative flex-1'>
						<div className='absolute top-0 bottom-0 h-full w-full'>
							{children}
						</div>
					</main>
					<Footer />
				</ReactQueryWrapper>
			</body>
		</html>
	);
}
