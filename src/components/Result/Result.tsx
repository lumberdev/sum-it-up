'use client';

import { useState, useEffect } from 'react';
import Container from '../utility-components/Container';
import { DataType } from '~/mock-response';

type ResultProp = {
	currentResult: DataType | null;
	handNewSearchBtnClick: () => void;
};

const Result = ({ currentResult, handNewSearchBtnClick }: ResultProp) => {
	const [resultType, setResultType] = useState<string>('summary');
	const [didCopy, setDidCopy] = useState<boolean>(false);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (didCopy) {
			timeoutId = setTimeout(() => setDidCopy(false), 2000);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [didCopy]);

	const copyToClipboard = async (textToCopy: string) => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setDidCopy(true);
		} catch (err) {
			console.error('Could not copy text: ', err);
		}
	};

	return (
		<Container>
			<div className='mx-auto max-w-3xl flex-1 py-8 text-center md:flex'>
				<div className='hidden basis-1/6 md:block'></div>
				<div className='mx-auto inline-flex h-12 w-full max-w-[21.5rem] items-center justify-center rounded-full bg-dark p-1 text-white'>
					<button
						key='summary'
						className={`h-full flex-1 rounded-full transition${
							resultType === 'summary' && ' bg-white text-dark'
						}`}
						onClick={() => setResultType('summary')}>
						Summary
					</button>
					<button
						key='key-points'
						className={`h-full flex-1 rounded-full transition${
							resultType === 'key-points' && ' bg-white text-dark'
						}`}
						onClick={() => setResultType('key-points')}>
						Key Points
					</button>
					<button
						key='analysis'
						className={`h-full flex-1 rounded-full transition${
							resultType === 'analysis' && ' bg-white text-dark'
						}`}
						onClick={() => setResultType('analysis')}>
						Analysis
					</button>
				</div>
				<button
					className='mt-8 ml-auto block basis-1/6 text-right font-bold md:ml-0 md:mt-0'
					onClick={handNewSearchBtnClick}>
					New Search
				</button>
			</div>
			<div className='mx-auto mb-8 max-w-3xl md:mt-8'>
				{resultType === 'summary' && currentResult && (
					<>
						<h3 className='my-4 text-heading3'>Summed Up!</h3>
						<div className='rounded-md bg-medium p-8 pb-6'>
							{currentResult.summary}
							<button
								onClick={() => {
									copyToClipboard(currentResult.summary);
								}}
								className='mt-6 ml-auto block rounded-md bg-darkest px-4 py-1 text-white'>
								{didCopy ? 'Copied' : 'Copy'}
							</button>
						</div>
					</>
				)}
				{resultType === 'key-points' && currentResult && (
					<>
						<h3 className='my-4 text-heading3'>The Key Points</h3>
						<ul className='list-disc'>
							{currentResult.keyPoints.map((keyPoint, id) => (
								<li key={id}>{keyPoint}</li>
							))}
						</ul>
					</>
				)}
				{resultType === 'analysis' && currentResult && (
					<>
						<h3 className='my-4 text-heading3'>Our take</h3>
						<div className='rounded-md bg-medium p-8'>
							<h4 className='my-2 text-heading4 font-bold'>
								Bias: {currentResult.bias}
							</h4>
							<div className='mb-4 p-2'>
								This articles has a {currentResult.bias} Lorem, ipsum dolor sit
								amet consectetur adipisicing elit. Unde, maiores.{' '}
							</div>
							<h4 className='my-2 text-heading4 font-bold'>
								Tone: {currentResult.tone}
							</h4>
							<div className='p-2'>
								This articles has a {currentResult.tone} Lorem, ipsum dolor sit
								amet consectetur adipisicing elit. Unde, maiores.{' '}
							</div>
						</div>
					</>
				)}
			</div>
		</Container>
	);
};

export default Result;
