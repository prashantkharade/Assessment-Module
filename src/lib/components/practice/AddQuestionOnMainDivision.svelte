<!-- <script lang="ts">
	import { setContext, onMount, afterUpdate } from 'svelte';
	import QuestionAdd from './questionAdd.svelte';

	export let queName = '';
	export let queType = '';
	export let queId: null = null;
	export let questionArray: any[] = [];
	export let isEditing: boolean;

	$: isEditing = queId ? true : false;

	export function removeQuestion(id: any) {
		questionArray = questionArray.filter((item) => item.id !== id);
	}

	function clearAllQuestions() {
		questionArray = [];
	}

	export function addQuestion({ queName, queType }) {
		let question = { id: Math.random() * Date.now(), queName, queType };
		questionArray = [question, ...questionArray];
	}

	function setModifiedQuestion(id: any) {
		let question = questionArray.find((item) => item.id === id);

		queId = question.id;
		queName = question.name;
		queType = question.type;
	}

	function editQuestion({ queName, queType }) {
		questionArray = questionArray.map((item) => {
			return item.id === queId ? { ...item, queName, queType } : { ...item };
		});
		queId = null;
		queName = '';
		queType = '';
	}

	setContext('remove', removeQuestion);
	setContext('modify', setModifiedQuestion);

	function setLocalStorage() {
		localStorage.setItem('questionArray', JSON.stringify(questionArray));
	}

	onMount(() => {
		return (questionArray = localStorage.getItem('questionArray')
			? JSON.parse(localStorage.getItem('questionArray'))
			: []);
	});

	afterUpdate(() => {
		setLocalStorage();
	});
</script> 

<div class="h-64 w-[80%] bg-slate-200 ml-[10%] mt-[50px] relative justify-between items-center">
	
	<QuestionAdd {addQuestion} {queName} {queType} {isEditing} {editQuestion} />

	<div id="output" class="bg-white h-20 w-full"></div>
</div>-->
