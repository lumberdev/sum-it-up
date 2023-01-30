import { Configuration, OpenAIApi } from 'openai';
import { mockData, DataType } from '../../../mock-response';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generatePrompt } from '~/utlis/generatePrompt';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Error = {
  error: { message: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataType | Error>,
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const { query } = req;
  const article = query.article || '';
  const wordLimit = query.wordLimit || '100';
  if (!article) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid article',
      },
    });
    return;
  }

  try {
    // Using Mockdata for testing
    // const completion = await openai.createCompletion({
    //   model: 'text-davinci-003',
    // prompt: generatePrompt(article, wordLimit),
    //   max_tokens: 1000,
    //   temperature: 0,
    // });
    // console.log(completion.data);
    res.status(200).json({ mockData });
  } catch (error) {
    if (error) {
      throw error;
    } else {
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}
