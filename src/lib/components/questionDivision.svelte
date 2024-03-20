<script lang="ts">
	// import { afterUpdate, getContext, onMount } from 'svelte';

	// import { myData } from '../routes/title/title';
	// import { browser } from '$app/environment';

	// import type { PageData } from '../routes/$types';
	// export let e: PageData;

	export let e;
	console.log(e);
	// $: {
	// 	data = $myData;
	// }

	// let name = '';

	// myData.set(name);
	// let id: any;
	// let name = '';
	// export let type = '';
	// let questionArray = [];

	// const removeQuestion = getContext('remove');
	// const setModifiedQuestion = getContext('modify');

	// function questionList() {
	// onMount(() => {
	// 	return (questionArray = localStorage.getItem('questionArray')
	// 		? JSON.parse(localStorage.getItem('questionArray'))
	// 		: []);
	// });
	// 	if (browser) {
	// 		let arr = localStorage.getItem('questionArray');
	// 		questionArray = JSON.parse(localStorage.getItem('arr'));
	// 		console.log(arr);
	// 	}
	// }
	// afterUpdate(() => {
	// 	questionList();
	// 	console.log('Page has been updated');
	// });

	// let isBrowser = import.meta.env.browser;

	// onMount(() => {
	// 	console.log('Is it a browser?', isBrowser);
	// });
</script>

<article>
	<div class=" w-full h-12 flex flex-row mb-2">
		<!-- {data} -->

		{#if e}
			<ul>
				{#each e as que}
					<div
						class="w-10/12 border-r-4 border-b-2 border-solid border-gray-700 bg-cyan-100 h-12 rounded-full text-center"
					>
					{que.question}
					</div>

					<div class="w-2/12h-12 flex flex-row">
						<button type="button" class="w-[50%] h-full text-white rounded-full">
							<!-- on:click={() => setModifiedQuestion(id)} -->
							<svg
								class="h-6 w-6 text-red-500"
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

						<button type="button" class="w-[50%] h-full text-white rounded-full">
							<!-- on:click={() => removeQuestion(id)} -->

							<svg
								class="h-6 w-6 text-red-500"
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
				{/each}
			</ul>
		{/if}

		<!-- {#if isBrowser}
			<p>This is a browser environment.</p>
		{:else}
			<p>This is not a browser environment.</p>
		{/if} -->
	</div>
</article>
