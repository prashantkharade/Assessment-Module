import type { PageLoad } from './$types';

export const load: PageLoad = async ({ depends }) => {
	let data;
	depends('app:addNew');
	const apiUrl = 'http://localhost:5555/api/v1/questionService/all';
	try {
		const response = await fetch(apiUrl);

		const result = await response.json();

		data = result;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
	console.log(data);
	return { data };
};
