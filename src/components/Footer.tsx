import Link from 'next/link';
import Container from './utility-components/Container';
const Footer = () => {
	return (
		<footer className='bg-lightest'>
			<Container className='flex min-h-[14rem] py-16'>
				<div className='flex flex-1 flex-col justify-between'>
					<div className='text-heading3 text-dark'>Sum It Up</div>
					<div className='text-dark'>© Lumber LLC. All rights reserved</div>
				</div>
				<div className='flex flex-1 flex-col justify-between text-right'>
					<div>
						Made by
						<span className='font-bold'> Lumber</span>
					</div>
					<div className='flex justify-end gap-10'>
						<Link href='/'>Privacy</Link>
						<Link href='/'>Terms</Link>
						<Link href='/'>Accessibility</Link>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
