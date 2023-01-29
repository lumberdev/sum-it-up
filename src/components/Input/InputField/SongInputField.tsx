import { InputType } from '~/types/types';
import { useState } from 'react';

const SongInputField = ({
	handleFormSubmit,
}: {
	handleFormSubmit: (event: React.SyntheticEvent, inputValue: string) => void;
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	return (
		<form
			action=''
			onSubmit={(event: React.SyntheticEvent) =>
				handleFormSubmit(event, inputValue)
			}>
				<div>
					<label htmlFor='website-url'>Song</label>
					<input
						type='text'
						name='website-url'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type='submit'>Summarize</button>
				</div>
		</form>
	);
};

export default SongInputField;
