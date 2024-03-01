import { invalidate } from "$app/navigation";

export async function addData(formData: any) {
    // Your server-side logic here
    let result;
    const url = 'http://localhost:5555/api/v1/questionService';
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		result = await response.json();
		console.log('POST response:', result);
		invalidate('app:addNew');
	} catch (error) {
		console.error('Error making POST request:', error);
	}
	formData.question = '';
	formData.type = '';
};
  
 

// export async function editQuestionC(id: number) {
//     isEditing = !isEditing;

//     let dataFromEdit;

//     const apiUrl = `http://localhost:5555/api/v1/questionService/${id}`;
//     try {
//         const response = await fetch(apiUrl);

//         const result = await response.json();

//         dataFromEdit = result;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
//     console.log('data from edit c', dataFromEdit);

//     formObj.question1 = dataFromEdit.Data.question;
//     formObj.type1 = dataFromEdit.Data.type;
//     formObj.id = dataFromEdit.Data.id;

//     localStorage.setItem('questionArray', JSON.stringify(dataFromEdit));
// }