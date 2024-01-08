import { invalidate } from "$app/navigation";

$: formObj = {
    id: '',
    question1: '',
    type1: ''
};
// $: question1 = 'what';
// $: type1 = 'type';

let isEditing: boolean = false;

// $: console.log('add', formObj.question1);
// $: console.log('add', formObj.type1);

async function editQuestionC(id: number) {
    isEditing = !isEditing;

    let dataFromEdit;

    const apiUrl = `http://localhost:5555/api/v1/questionService/${id}`;
    try {
        const response = await fetch(apiUrl);

        const result = await response.json();

        dataFromEdit = result;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log('data from edit c', dataFromEdit);

    // let a = dataFromEdit.Data.Data.question;
    // console.log(dataFromEdit.Data.question)

    formObj.question1 = dataFromEdit.Data.question;
    formObj.type1 = dataFromEdit.Data.type;
    formObj.id = dataFromEdit.Data.id;

    // return dataFromEdit;
    localStorage.setItem('questionArray', JSON.stringify(dataFromEdit));
}

console.log('before D', formObj);
async function editQuestionD() {
    // try {
    let questionArray1 = localStorage.getItem('questionArray');
    if (questionArray1 !== null) {
        const storedQuestion = JSON.parse(questionArray1);
        // console.log('This is from D method', storedQuestion);

        let id = storedQuestion.Data.id;
        // let userName = storedQuestion.Data.question;
        // let userAge = storedQuestion.type;
        console.log('This id is from D method', id);
        console.log('before fetch  D', formObj);
        console.log(typeof formObj);
        let formObj1 = {
            question: formObj.question1,
            type: formObj.type1
        };

        try {
            const response1 = await fetch(`http://localhost:5555/api/v1/questionService/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers if needed
                },
                body: JSON.stringify(formObj1)
            });

            // Handle the response as needed
            const result1 = await response1.json();
            console.log('PUT response:', result1);
            invalidate('app:addNew');
        } catch (error) {
            console.error('Error making PUT request:', error);
        }
    } else {
        console.log('error');
    }
    isEditing = !isEditing;

    // const response1 = await fetch(`http://localhost:5555/api/v1/questionService/update/${id}`, {
    // 	method: 'PUT',
    // 	headers: {
    // 		'Content-Type': 'application/json'
    // 	},
    // 	body: JSON.stringify(formObj)
    // });

    // Handle the response as needed
    // 	const result1 = await response1.json();
    // 	console.log('PUT response:', result1);
    // } catch (error) {
    // 	console.error('Error making PUT request:', error);
    // }
    // question = '';
    // type = '';
}