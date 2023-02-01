import { useState } from 'react';
import { ContentType } from '~/types';
import { handleFormSubmitType } from '../Input';

const TextInputField = ({
	handleFormSubmit,
}: {
	handleFormSubmit: handleFormSubmitType;
}) => {
	const [inputValue, setInputValue] = useState<string>('');
	const type = 'text';
	return (
		<form
			className='flex w-full flex-col rounded-md'
			onSubmit={(event: React.SyntheticEvent) =>
				handleFormSubmit(event, type, '', inputValue)
			}>
			<textarea
				className='block h-[16rem] w-full rounded-md p-2.5'
				name='text-input'
				value={inputValue}
				placeholder='Enter some text'
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				className='mx-auto mt-4 flex h-11 w-[10rem] items-center justify-center rounded-full bg-darkest text-heading4 font-semibold text-white md:h-12'
				type='submit'>
				Summarize
			</button>
		</form>
	);
};

export default TextInputField;
