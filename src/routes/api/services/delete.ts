import { invalidate } from "$app/navigation";

export const deleteData1 = async (encodedId: number) => {
	const url = `http://localhost:5555/api/v1/questionService/delete/${encodedId}`;
	try {
		const response = await fetch(url, {
			method: 'DELETE'
		});

		const result = await response.json();
		console.log('DELETE response:', result);
		invalidate('app:addNew');
	} catch (error) {
		console.error('Error making DELETE request:', error);
	}
};