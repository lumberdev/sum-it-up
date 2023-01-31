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
		setDisplayResult(true);
		setCurrentResult((prev) => ({ ...prev, ...newResult }));
	};
	const handNewSearchBtnClick = () => {
		setDisplayResult(false);
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
