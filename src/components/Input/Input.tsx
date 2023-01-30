'use client';

import { useState } from 'react';
import { InputType } from '~/types';
import WebsiteInputField from './InputField/WebsiteInputField';
import SongInputField from './InputField/SongInputField';
import TextInputField from './InputField/TextInputField';

const Input = ({
	handleFormSubmit,
}: {
	handleFormSubmit: (
		event: React.SyntheticEvent,
		inputValue: string
	) => Promise<void>;
}) => {
	const [inputSelected, setInputSelected] = useState<InputType>(
		InputType.WEBSITE
	);

	return (
		<div className='p-8 text-center'>
			<div className='mx-auto inline-flex h-12 items-center justify-center rounded-full bg-dark p-1 text-white'>
				{(Object.keys(InputType) as Array<keyof typeof InputType>).map(
					(key) => (
						<button
							key={key}
							className={`h-full min-w-[6.625rem] rounded-full transition${
								InputType[key] === inputSelected && ' bg-white text-dark'
							}`}
							onClick={() => setInputSelected(InputType[key])}>
							{InputType[key]}
						</button>
					)
				)}
			</div>
			<div className='my-12 flex flex-col items-center justify-center'>
				<label htmlFor='input-summary-length' className='mb-6 text-dark'>
					Length of the summary in words:
				</label>
				<input
					type='range'
					className='h-0.5 min-w-[30rem] cursor-pointer appearance-none bg-medium p-0 '
					min='100'
					max='300'
					step='100'
					id='input-summary-length'
				/>
			</div>
			{inputSelected === InputType.WEBSITE && (
				<WebsiteInputField handleFormSubmit={handleFormSubmit} />
			)}
			{inputSelected === InputType.SONG && (
				<SongInputField handleFormSubmit={handleFormSubmit} />
			)}
			{inputSelected === InputType.TEXT && (
				<TextInputField handleFormSubmit={handleFormSubmit} />
			)}
		</div>
	);
};

export default Input;
