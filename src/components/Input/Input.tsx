'use client';

import { useState } from 'react';
import { InputType } from '~/types';
import WebsiteInputField from './InputField/WebsiteInputField';
import SongInputField from './InputField/SongInputField';
import TextInputField from './InputField/TextInputField';
import { fetchArticleData } from '~/query/fetch-article-data';
import Container from '../utility-components/Container';

const Input = () => {
	const [inputTypeSelected, setInputTypeSelected] = useState<InputType>(
		InputType.WEBSITE
	);
	const [summaryLength, setSummaryLength] = useState('200');

	const handleFormSubmit = async (
		event: React.SyntheticEvent,
		inputUrl: string
	) => {
		event.preventDefault();
		try {
			const res = await fetchArticleData(inputUrl);

			const existingData = localStorage.getItem('summaries');
			if (existingData) {
				const existingDataArr: { [key: string]: string }[] =
					JSON.parse(existingData);
				existingDataArr.push(res);
				console.log(JSON.stringify(existingDataArr));
				localStorage.setItem('summaries', JSON.stringify(existingDataArr));
			} else {
				console.log(JSON.stringify([res]));
				localStorage.setItem('summaries', JSON.stringify([res]));
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<div className='mx-auto max-w-[31.875rem] py-8 text-center'>
				<div className='mx-auto inline-flex h-12 items-center justify-center rounded-full bg-dark p-1 text-white'>
					{(Object.keys(InputType) as Array<keyof typeof InputType>).map(
						(key) => (
							<button
								key={key}
								className={`h-full min-w-[6.625rem] rounded-full transition${
									InputType[key] === inputTypeSelected && ' bg-white text-dark'
								}`}
								onClick={() => setInputTypeSelected(InputType[key])}>
								{InputType[key]}
							</button>
						)
					)}
				</div>
				<div className='my-12 flex flex-col items-center justify-center'>
					<label htmlFor='summary-length' className='mb-6 font-bold text-dark'>
						Length of the summary in words:
					</label>
					<input
						type='range'
						className='flex min-w-[30rem] cursor-pointer items-center bg-medium p-0 focus:shadow-none'
						min='100'
						max='300'
						step='100'
						list='markers'
						value={summaryLength}
						id='summary-length'
						onChange={(event) => {
							setSummaryLength(event.target.value);
						}}
					/>

					<datalist id='markers' className='flex w-full justify-between pt-4'>
						<option value='100' label='Shortest'></option>
						<option value='200' label='Short'></option>
						<option value='300' label='Short-ish'></option>
					</datalist>
				</div>
				{inputTypeSelected === InputType.WEBSITE && (
					<WebsiteInputField handleFormSubmit={handleFormSubmit} />
				)}
				{inputTypeSelected === InputType.SONG && (
					<SongInputField handleFormSubmit={handleFormSubmit} />
				)}
				{inputTypeSelected === InputType.TEXT && (
					<TextInputField handleFormSubmit={handleFormSubmit} />
				)}
			</div>
		</Container>
	);
};

export default Input;
