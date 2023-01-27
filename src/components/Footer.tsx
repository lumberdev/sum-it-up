import Link from 'next/link';
const Footer = () => {
	return (
		<footer className='flex min-h-[14rem] bg-lightest px-10 py-[4.25rem]'>
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
		</footer>
	);
};

export default Footer;
