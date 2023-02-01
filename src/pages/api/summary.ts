// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockResponse, DataType } from '~/mock-response';
const responseBody = {
	keyPoints: [
		'Mercedes-Benz is the first automaker to receive government approval in the US for a Level 3 driving feature',
		'The company self-certified in Nevada for use of its Drive Pilot feature, in which the car does all the driving but the driver needs to stand by to take control at a moment’s notice',
		'Nevada does not issue any permit or license based on an autonomous vehicle’s level of automation',
		'Mercedes-Benz’s Drive Pilot is similar to “hands-free” highway driving systems like GM’s Super Cruise, Ford’s BlueCruise, and Tesla’s Autopilot',
		'The driver must keep their face visible to the vehicle’s in-car cameras at all times but can also turn their head to talk to a passenger or play a game on the vehicle’s infotainment screen',
		'Most autonomous vehicle operators, including Waymo and Cruise, have said they think Level 3 is too dangerous, preferring to work exclusively on Level 4 technology',
	],
	bias: 'neutral',
	tone: 'informational',
	summary:
		"Mercedes-Benz announced that it has received government approval for the first Level 3 driving feature in the US. The company's Drive Pilot feature allows the car to do all the driving but the driver needs to be able to take control at a moment's notice. The technology meets Nevada's 'minimal risk condition' requirement for Level 3 or higher fully autonomous vehicles to be able to stop if there is a malfunction in the system. The system is similar to hands-free highway driving systems from other companies, but with some differences in terms of driver monitoring. Mercedes plans to receive approval to begin offering its Level 3 system to drivers in California later this year.",
	trust: 8,
};
function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {
	if (req.method === 'POST') {
		const requestBody = req.body;
		console.log(requestBody);

		res.status(201).json(mockResponse.data);
	} else {
		res.status(200).json(mockResponse.data);
	}
}

export default handler;
