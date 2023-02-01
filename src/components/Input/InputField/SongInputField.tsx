import { useState } from 'react';
import { InputType } from '~/types';

const SongInputField = ({
	handleFormSubmit,
}: {
	handleFormSubmit: (event: React.SyntheticEvent, inputUrl: string) => void;
}) => {
	const [songTitle, setSongTitle] = useState<string>('');
	const [artistName, setArtistName] = useState<string>('');

	return (
		<form
			className='flex w-full flex-col rounded-md'
			onSubmit={(event: React.SyntheticEvent) => {
				const inputUrl = `https://www.google.com/search?q=lyrics+to+${artistName
					.split(' ')
					.join('-')}+${songTitle.split(' ').join('-')}`;
				handleFormSubmit(event, inputUrl);
			}}>
			<label className='mb-3 font-semibold' htmlFor='song-name'>
				Enter Song Title
			</label>
			<input
				className='mb-6 h-12 rounded-full px-4 text-center'
				type='text'
				name='song-name'
				value={songTitle}
				onChange={(e) => setSongTitle(e.target.value)}
			/>
			<label className='mb-3 font-semibold' htmlFor='artist-name'>
				Enter Artist
			</label>
			<input
				className='mb-6 h-12 rounded-full px-4 text-center'
				type='text'
				name='artist-name'
				value={artistName}
				onChange={(e) => setArtistName(e.target.value)}
			/>
			<button
				className='mx-auto mt-4 flex h-11 w-[10rem] items-center justify-center rounded-full bg-darkest text-heading4 font-semibold text-white md:h-12'
				type='submit'>
				Summarize
			</button>
		</form>
	);
};

export default SongInputField;
