<script lang="ts">
	// import { getContext, onMount } from 'svelte';
	import SecondNavbar from '../../components/SecondNavbar.svelte';
	// import QuestionDivision from '../../components/questionDivision.svelte';
	import QuestionForm from '../../components/questionForm.svelte';
	import type { PageData } from './$types';
	// import editQuestion from '../../components/questionForm.svelte';
	import { invalidate } from '$app/navigation';
	import {deleteData1} from '../api/services/delete';

	export let data: PageData;
	$: questionList = data.data.Data;
	$: console.log('from page', questionList);

	// export let submittedData = writable([]);
	// let submittedData = [];
	// const handleFormSubmit = (event) => {
	// 	submittedData.update(data => [event.detail, ...data]);
	// };

	// let submittedData=[];
	// onMount(async () => {
	// Simulate fetching initial data from the database
	// In a real application, you'd make an API request here
	//     const response = await fetch('your-api-endpoint');
	//     submittedData = await response.json();
	//   });
	// let questionList = data.data.Data;
	// console.log(data);
	// console.log(typeof data);

	// const jsonArray = Object.values(data);
	// let a = jsonArray;
	// console.log(typeof a);
	// console.log(a);

	// $: {
	// 	questionListAlter = questionList.map((item, index) => ({ ...item, index: index + 1 }));
	// }

	// console.log(questionList);
	//  async function showQuestionData() {
	// 	let data;
	// 	const apiUrl = 'http://localhost:5555/api/v1/questionService/all';
	// 	try {
	// 		const response = await fetch(apiUrl);
	// 		const result = await response.json();
	// 		// const jsonArray = Object.values(result);
	// 		data = result;
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// 	console.log(data);
	// 	return { data };
	//  }
	// let id;




	// const deleteData = async (encodedId: number) => {
	// 	const url = `http://localhost:5555/api/v1/questionService/delete/${encodedId}`;
	// 	try {
	// 		const response = await fetch(url, {
	// 			method: 'DELETE'
	// 		});

	// 		const result = await response.json();
	// 		console.log('DELETE response:', result);
	// 		invalidate('app:addNew');
	// 	} catch (error) {
	// 		console.error('Error making DELETE request:', error);
	// 	}
	// };




	// $: console.log("Form data after click",formData)
	// function async handleEdit(id: number) {
	// 	console.log("from page",id)
	// 	Editdata = await editQuestionc(id);
	// 	console.log(Editdata);
	// }

	// console.log(Editdata.Data);

	// const editQuestionA = async (id: number) => {
		// console.log('clicked');
		// console.log(id);

		// let dataFromEdit;

		// const apiUrl = `http://localhost:5555/api/v1/questionService/${id}`;
		// try {
		// 	const response = await fetch(apiUrl);

		// 	const result = await response.json();

		// 	dataFromEdit = result;
		// } catch (error) {
		// 	console.error('Error fetching data:', error);
		// }
		// console.log(dataFromEdit);
		// return dataFromEdit;

		// try {
		// 	const response = await fetch(`http://localhost:5555/api/v1/questionService/update/${id}`, {
		// 		method: 'PUT',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(formData)
		// 	});

		// 	// Handle the response as needed
		// 	const result = await response.json();
		// 	console.log('PUT response:', result);
		// } catch (error) {
		// 	console.error('Error making PUT request:', error);
		// }
		// formData.question = '';
		// formData.type = '';
	// };


	// let dataFromEdit:any;
	// const editQuestionB = async (encodedId: number) => {
	// 	console.log("From editB",encodedId);
	// 	const url = `http://localhost:5555/api/v1/questionService/${encodedId}`;
	// 	try {
	// 		const response = await fetch(url, {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(formData)

	// 		});

	// 		const result = await response.json();
	// 		console.log('PUT response:', result);
	// 		dataFromEdit=result;;
	// 	} catch (error) {
	// 		console.error('Error making PUT request:', error);
	// 	}
	// 	console.log(dataFromEdit);

	// };

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
</script>

<SecondNavbar />
<div class="flex flex-row">
	<div class="h-screen w-[70%] bg-lime-100 rounded-xl">
		<QuestionForm />
		{#if isEditing}
			<div class="bg-slate-400 h-[15rem] w-[65rem] p-2 m-2 rounded-3xl">
				<form action="" on:submit|preventDefault={editQuestionD}>
					<input
						type="text"
						placeholder="Add your question ?"
						class="h-12 ml-[1%] mt-[5%] w-[80%] border border-red-400 rounded-xl"
						id="queName"
						bind:value={formObj.question1}
					/>

					<button type="button">
						<select id="cars" class="h-10 rounded-xl p-2" id="queType" bind:value={formObj.type1}>
							<option value="text">Text</option>
							<option value="multiplechoice">Multiple choice</option>
							<option value="checkbox">Checkbox</option>
							<option value="dropdown">Drop-down</option>
							<option value="file">File</option>
							<option value="number">Number</option>
							<option value="date">Date</option>
							<option value="time">Time</option>
						</select>
					</button>

					<button class="bg-slate-500 h-10 mt-[2rem] w-32 ml-[83%] rounded border-r-2"
						>Edit Question</button
					>
				</form>
			</div>
		{/if}
	</div>
	<div class="h-screen w-[30%] bg-slate-200 rounded-xl p-2">
		{#if questionList && questionList.length > 0}
			<ul>
				{#each questionList as e}
					<li class="flex flex-row m-2">
						<div
							class="w-10/12 border-r-4 border-b-2 border-solid border-gray-700 bg-cyan-50 h-12 rounded-full text-center hover:bg-cyan-200"
						>
							{e.question}{e.id}
						</div>
						<div class="w-2/12 h-12 flex flex-row">
							<button
								type="button"
								class="w-[50%] h-full text-white rounded-full hover:bg-slate-300"
								on:click={async () => await editQuestionC(e.id)}
							>
								<svg
									class="h-6 w-6 text-red-400 ml-1 relative"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg
								></button
							>

							<button
								type="button"
								class="w-[50%] h-full text-white rounded-full hover:bg-slate-300"
								on:click={() => deleteData1(e.id)}
							>
								<svg
									class="h-6 w-6 text-red-400 ml-1"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="3 6 5 6 21 6" />
									<path
										d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
									/> <line x1="10" y1="11" x2="10" y2="17" />
									<line x1="14" y1="11" x2="14" y2="17" /></svg
								></button
							>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
		<button class="h-12 bg-blue-400 hover:bg-sky-800 hover:text-white w-80 rounded-full ml-20"
			>Clear All</button
		>
	</div>
</div>

<!-- 
<script>
	
	 import SecondNavbar from '../components/SecondNavbar.svelte';
	 import QuestionForm from '../components/questionForm.svelte';
	 import QuestionList from '../components/questionList.svelte';

	 export let questionArray =[];
	 function clearQuestion() {
	 	questionArray = [];
	 }
 </script> 

 <div class=" flex flex-row">
	<div class=" bg-rose-300 w-[8%] h-screen"></div>
	<div class="w-[70%] h-screen bg-green-100 items-center">
		<QuestionForm/>
	</div>
	<div class=" bg-rose-100 w-[22%] h-screen">
		<QuestionList  />
		<button type="button" class="h-12 w-[20rem] bg-red-500 rounded-full" on:click={clearQuestion}>
			Clear All
		</button>
	</div>
</div>  -->
