'use client';
import { useState } from 'react';
import InputComponent from '~/components/Input/Input';
import About from '~/components/About';
import Result from '~/components/Result/Result';
import { DataType } from '~/mock-response';

export default function Home() {
	const [displayResult, setDisplayResult] = useState(false);
	const [currentResult, setCurrentResult] = useState<DataType | null>(null);

	const handleSummarize = (newResult: DataType) => {
		setLocalStorage(newResult);
		setDisplayResult(true);
		setCurrentResult((prev) => ({ ...prev, ...newResult }));
	};
	const handNewSearchBtnClick = () => {
		setDisplayResult(false);
	};

	const setLocalStorage = (newData: DataType) => {
		console.log(newData);
		const existingData = localStorage.getItem('summaries');
		if (existingData) {
			const existingDataArr: DataType[] = JSON.parse(existingData);
			existingDataArr.push(newData);
			localStorage.setItem('summaries', JSON.stringify(existingDataArr));
		} else {
			localStorage.setItem('summaries', JSON.stringify([newData]));
		}
	};

	return (
		<>
			{displayResult ? (
				<Result
					currentResult={currentResult}
					handNewSearchBtnClick={handNewSearchBtnClick}
				/>
			) : (
				<>
					<InputComponent handleSummarize={handleSummarize} />
					<About />
				</>
			)}
		</>
	);
}
