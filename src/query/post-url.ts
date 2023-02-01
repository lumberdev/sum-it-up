export const postUrl = async function postData(data = {}) {
	const response = await fetch(`/api/summary`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};
