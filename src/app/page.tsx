'use client';
import Input from '~/components/Input/Input';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const handleFormSubmit = async (
		event: React.SyntheticEvent,
		inputValue: string
	) => {
		event.preventDefault();
		try {
			const response = await fetch('/api/hello', {
				method: 'POST',
				body: JSON.stringify({ payload: inputValue }),
				headers: { 'Content-Type': 'application/json' },
			});
			const json = await response.json();
			const jsonData = JSON.stringify(json);
			localStorage.setItem('data', jsonData);
      router.push('/result');
			console.log(json);
		} catch (error) {
			console.error(error);
		}
	};
	return <Input handleFormSubmit={handleFormSubmit} />;
}
