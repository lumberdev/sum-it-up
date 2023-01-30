import { ReactNode } from 'react';

const Container = ({ children, className }: Props) => {
	return (
		<div className={`mx-auto max-w-7xl p-10 ${className}`}>
			{children}
		</div>
	);
};

type Props = {
	children: ReactNode;
	className?: string;
};

export default Container;
