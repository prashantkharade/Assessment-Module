<!-- <script lang="ts">
	import Questions from "../Questions";

	export let queName = '';
	export let queType = '';
	export let addQuestion;
	export let isEditing:boolean;
	export let editQuestion;

	$: isEmpty = !queName || !queType;
	function handleSubmit() {
		if (isEditing) {
			editQuestion({ queName, queType });
		} else {
			addQuestion({ queName, queType });
		}

		queName = '';
		queType = '';
	}
</script>

<form action="" on:submit|preventDefault={handleSubmit}>
	<input
		type="text"
		placeholder="Add your queation ?"
		class="h-12 ml-[1%] mt-[5%] w-[80%] border border-red-400"
		id="queName"
		bind:value={queName}
	/>

	<button type="button">
		<select id="cars" class="h-10" id="queType" bind:value={queType}>
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
	{#if isEmpty}
		<p class="form-empty">Please fill out all form fields</p>
	{/if}
	<button
		class="bg-slate-500 h-10 mt-[12%] w-32 ml-[83%] rounded border-r-2"
		class:disabled={isEmpty}
		disabled={isEmpty}
		>{#if isEditing}edit Question{:else}add Question{/if}Submit</button
	>
</form> -->
