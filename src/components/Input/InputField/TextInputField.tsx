import { useState } from 'react';

const TextInputField = ({
	handleFormSubmit,
}: {
	handleFormSubmit: (event: React.SyntheticEvent, inputUrl: string) => void;
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	return (
		<form
			className='flex w-full flex-col rounded-md'
			onSubmit={(event: React.SyntheticEvent) =>
				handleFormSubmit(event, inputValue)
			}>
			<textarea
				className='block h-[16rem] w-full rounded-md p-2.5'
				name='text-input'
				value={inputValue}
				placeholder='Enter some text'
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				className='mx-auto mt-4 flex h-[48px] w-[10rem] items-center justify-center rounded-full bg-darkest text-heading4 font-semibold text-white'
				type='submit'>
				Summarize
			</button>
		</form>
	);
};

export default TextInputField;
