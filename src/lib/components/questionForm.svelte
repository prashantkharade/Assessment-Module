<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { text } from '@sveltejs/kit';
	import { afterUpdate, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Checkbox from './Input.option/checkbox.svelte';
	import MultipleChoices from './Input.option/multipleChoices.svelte';
	import Dropdown from './Input.option/dropdown.svelte';
	import File from './Input.option/file.svelte';
	import Number from './Input.option/number.svelte';
	import SingleChoice from './Input.option/singleChoice.svelte';
	// import editQuestionaaa from '../routes/new/+page.svelte';

	let name = '';
	let id = '';
	// export let dataFromEdit;
	// export let isEditing: boolean;

	$: isEmpty = !formData.question || !formData.type;

	// let questionArray: any[] = [];
	// let questionId: null = null;

	// $: isEditing = questionId ? true : false;
	// function handleSubmit(){
	// 	if (isEditing){
	// 		console.log("Question is editiong")
	// 	}else{
	// 		console.log("Adding new question")
	// 	}
	// }

	// function addQuestion({ name, type }) {
	// 	let que = { id: Math.random() * Date.now(), name, type };
	// 	questionArray = [...questionArray, que];
	// }
	// function editQuestion({ name, type }) {
	// 	questionArray = questionArray.map((item) => {
	// 		return item.id === questionId ? { ...item, name, type } : { ...item };
	// 	});
	// 	questionId = null;
	// 	name = '';
	// 	type = '';
	// }

	// function removeQuestion(id: any) {
	// 	questionArray = questionArray.filter((item) => item.id !== id);
	// }

	// function setModifiedQuestion(id: any) {
	// 	let que = questionArray.find((item) => item.id === id);
	// 	questionId = que.id;
	// 	question = que.name;
	// 	questionType = que.type;
	// }

	// setContext('remove', removeQuestion);
	// setContext('modify', setModifiedQuestion);

	// function setLocalStorage() {
	// 	console.log('This method has been called');
	// 	localStorage.setItem('questionArray', JSON.stringify(questionArray));
	// }

	// onMount(() => {
	// 	return (questionArray = localStorage.getItem('questionArray')
	// 		? JSON.parse(localStorage.getItem('questionArray'))
	// 		: []);
	// });

	// afterUpdate(() => {
	// 	console.log('Page has been updated');
	// 	setLocalStorage();
	// });
	// let questionList;

	// const formData1 = writable({ name: '', email: '' });

	// const formData2 = writable({
	// 	question: '',
	// 	type: ''
	// });
	// onMount(async () => {
	// 	addData();
	// });

	/* This is code from CHAT-GPT
	import { createEventDispatcher } from 'svelte';
	//   import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	//   let formData = { name: '', email: '' };

	const handleSubmitData = async () => {
		const data = $formData; // Access the current value of the store
		const result = { ...data };
		// const result = { ...formData };
		const url = 'http://localhost:5555/api/v1/questionService';
		// const data = {
		// 	question: '$:{name}',
		// 	type: '$:{type}'
		// };

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json();
			console.log('POST response:', result);
			formData.update(() => ({ question: '', type: '' }));
		} catch (error) {
			console.error('Error making POST request:', error);
		}


		// Simulate sending data to the database
		// In a real application, you'd make an API request here
		// const response = await fetch('your-api-endpoint', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify(formData),
		// });
		// const result = await response.json();

		// Clear the form after submission
		// formData.question = '';
		// formData.type = '';

		// Dispatch a custom event to notify the parent component
		dispatch('submit', result);
	};
	*/

	// let form = {

	// };

	export function handleSubmit() {
		addData();

		// formData.question = '';
		// formData.type = '';
	}

	let formData2 = {
		Required: '1',
		TemplateId: '2',
		NodeType: 'question',
		Title:'what is your name ...?',
		Score:'3'
	};



	let formData = {
		question:'',
		type:''
	};
	let result;

	const addData = async () => {
		const url = 'http://localhost:7272/api/v1/clinical/assessments/200/start';
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData2)
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
	// const abc = dataFromEdit
	//  const editQuestion = async ( id:number) => {
	// 	console.log("heeee")
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

	function handleChange(event) {
		formData.type = event.target.value;
	}
</script>

<section class="bg-slate-200 h-fit w-[65rem] p-2 m-2 rounded-3xl">
	<form action="" on:submit|preventDefault={addData}>
		<input
			type="text"
			placeholder="Add your question ?"
			class="h-12 ml-[1%] mt-[5%] w-[80%] border rounded-xl"
			id="queName"
			bind:value={formData.question}
		/>
		<!-- bind:value={$formData.question} -->

		<button type="button">
			<select
				class="h-10 rounded-xl p-2"
				id="queType"
				bind:value={formData.type}
				on:change={handleChange}
			>
				<option value="text">Text</option>
				<!-- <option value="multiplechoice">Multiple choice</option> -->
				<option value="singlechoice">Single choice</option>
				<option value="checkbox">Checkbox</option>
				<option value="dropdown">Drop-down</option>
				<option value="file">File</option>
				<option value="number">Number</option>
				<option value="date">Date</option>
				<option value="time">Time</option>
				<option value="float">Float</option>
				<option value="integer">Integer</option>
				<option value="boolean">Boolean</option>
				<!-- <option value="object">Object</option> -->
				<!-- <option value="textArray">Text Array</option> -->
				<!-- <option value="floatArray">Float Array</option> -->
				<!-- <option value="integerArray">Integer Array</option> -->
				<!-- <option value="booleanArray">Boolean Array</option> -->
				<!-- <option value="objectArray">Object Array</option> -->
				<!-- <option value="biometric">Biometric</option> -->

				<!-- <option value="dateTime">DateTime</option> -->
				<option value="rating">Rating</option>
				<!-- <option value="location">Location</option> -->
				<!-- <option value="range">Range</option> -->
				<option value="ok">OK</option>
				<option value="none">None</option>
			</select>
		</button>
		<div class="">
			{#if isEmpty}
				<p class="text-[#ec8954] mt-[20px] ml-[20rem]">Please fill out all form fields</p>
			{/if}
		</div>
		{#if formData.type === 'text'}
			<div class=" mt-3 bg-green-500">
				<input type="text" placeholder="Enter text here" class="w-full" />
			</div>
		{:else if formData.type === 'multiplechoice'}
			<div><MultipleChoices /></div>
		{:else if formData.type === 'singlechoice'}
			<div><SingleChoice /></div>
			{:else if formData.type === 'checkbox'}
			<div><Checkbox /></div>
		{:else if formData.type === 'dropdown'}
			<div><Dropdown /></div>
		{:else if formData.type === 'file'}
			<div><File /></div>
		{:else if formData.type === 'number'}
			<div class="p-3 mt-3 bg-green-500"></div>
		{:else if formData.type === 'date'}
			<div class="p-3 mt-3 bg-green-500">This is the date div.</div>
		{:else if formData.type === 'time'}
			<div class="p-3 mt-3 bg-green-500">This is the time div.</div>
		{:else if formData.type === 'float'}
			<div class="p-3 mt-3 bg-green-500">This is the number div.</div>
		{:else if formData.type === 'integer'}
			<div class="p-3 mt-3 bg-green-500">This is the date div.</div>
		{:else if formData.type === 'boolean'}
			<div class="p-3 mt-3 bg-green-500">This is the time div.</div>
		{:else if formData.type === 'datetime'}
			<div class="p-3 mt-3 bg-green-500">This is the number div.</div>
		{:else if formData.type === 'rating'}
			<div class="p-3 mt-3 bg-green-500">This is the date div.</div>
		{:else if formData.type === 'location'}
			<div class="p-3 mt-3 bg-green-500">This is the time div.</div>
		{:else if formData.type === 'range'}
			<div class="p-3 mt-3 bg-green-500">This is the time div.</div>
		{:else}
			<div class="">No type selected.</div>
		{/if}

		<button
			class="bg-slate-500 h-10 w-32 ml-[83%] rounded border-r-2 relative"
			class:disabled={isEmpty}
			disabled={isEmpty}>Add Question</button
		>
	</form>
</section>
