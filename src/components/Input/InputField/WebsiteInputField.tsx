import { useState } from 'react';

const WebsiteInputField = ({
	handleFormSubmit,
}: {
	handleFormSubmit: (event: React.SyntheticEvent, inputUrl: string) => void;
}) => {
	const [inputUrl, setInputUrl] = useState<string>('');

	return (
		<form
			className='flex h-12 w-full justify-center overflow-hidden rounded-full'
			onSubmit={(event: React.SyntheticEvent) =>
				handleFormSubmit(event, inputUrl)
			}>
			<input
				className='flex w-3/4 items-center justify-center px-6'
				type='text'
				name='website-url'
				value={inputUrl}
				placeholder='Enter a web page URL'
				onChange={(e) => setInputUrl(e.target.value)}
			/>
			<button
				type='submit'
				className='flex min-w-[10rem] items-center justify-center bg-darkest text-heading4 font-semibold text-white'>
				Summarize
			</button>
		</form>
	);
};

export default WebsiteInputField;
