'use client';
import { useState } from 'react';
import InputComponent from '~/components/Input/Input';
import About from '~/components/About';
import SongResult from '~/components/Result/SongResult';
import TextResult from '~/components/Result/TextResult';
import {
	ResponseType,
	SongMeaningResponseType,
	TextSummaryResponseType,
} from '~/types';

export default function Home() {
	const [displayResult, setDisplayResult] = useState(false);
	const [currentResult, setCurrentResult] = useState<ResponseType | null>(null);

	const handleSummarize = (newResult: ResponseType) => {
		setLocalStorage(newResult);
		setDisplayResult(true);
		setCurrentResult(newResult);
	};
	const handNewSearchBtnClick = () => {
		setDisplayResult(false);
	};

	const setLocalStorage = (newData: ResponseType) => {
		const existingData = localStorage.getItem('summaries');
		if (existingData) {
			const existingDataArr: ResponseType[] = JSON.parse(existingData);
			existingDataArr.push(newData);
			localStorage.setItem('summaries', JSON.stringify(existingDataArr));
		} else {
			localStorage.setItem('summaries', JSON.stringify([newData]));
		}
	};

	return (
		<>
			{displayResult ? (
				currentResult?.type == 'song' ? (
					<SongResult
						songMeaningResponse={currentResult as SongMeaningResponseType}
						handNewSearchBtnClick={handNewSearchBtnClick}
					/>
				) : (
					<TextResult
						textSummaryResponse={currentResult as TextSummaryResponseType}
						handNewSearchBtnClick={handNewSearchBtnClick}
					/>
				)
			) : (
				<>
					<InputComponent handleSummarize={handleSummarize} />
					<About />
				</>
			)}
		</>
	);
}
