<script lang="ts">
	import SecondNavbar from '../../../../lib/components/SecondNavbar.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';

	//////////////////////////////////////////////////////////////////////
	export let data: PageServerData;
	const assessments = data.assessmentTemplate;
	// console.log(assessments, 'This is data from new');
	let userId = $page.params.userId;
	// console.log(userId, 'This is from user new page');
	export let form;
</script>

<SecondNavbar {userId} />
<div class="my-auto flex h-fit flex-row p-10">
	<div class="w-[65%] rounded-xl bg-slate-300 p-8 shadow-xl shadow-slate-800">
		<form use:enhance method="post" action="?/new">
			<h1 class="text-center text-2xl font-bold text-slate-600">Create Assessment Template</h1>

			<label for="title" class=" text-md mt-5">Title</label>
			<input
				type="text"
				name="title"
				required
				placeholder="Enter title here..."
				class="my-2 w-full rounded-md border p-2 shadow-lg shadow-slate-500 focus:border-blue-300 focus:outline-none focus:ring"
			/>

			<label for="description" class="text-md my-5">Description</label>
			<textarea
				name="description"
				placeholder="Enter description here..."
				class="my-2 w-full rounded-md border border-gray-300 p-2 shadow-lg shadow-slate-500 focus:border-blue-300 focus:outline-none focus:ring"
			></textarea>

			<label for="type" class=" text-md">Type</label>
			<select
				class="select my-2 w-full rounded-md border border-gray-300 p-2 shadow-lg shadow-slate-500 focus:border-blue-300 focus:outline-none focus:ring"
				name="type"
				placeholder="Select type here..."
			>
				<option class="bg-white text-gray-700" value="Survey">Survey</option>
				<option class="bg-white text-gray-700" value="Questionnaire">Questionnaire</option>
				<option class="bg-white text-gray-700" value="TestPaper">TestPaper</option>
				<option class="bg-white text-gray-700" value="DataCollection">DataCollection</option>
			</select>

			<label for="currentVersion" class=" text-md">Current Version</label>
			<input
				type="text"
				name="currentVersion"
				placeholder="Enter Display Code here"
				class="my-2 w-full rounded-md border border-gray-300 p-2 shadow-lg shadow-slate-500 focus:border-blue-300 focus:outline-none focus:ring"
			/>

			<label for="displayCode" class=" text-md">Display Code</label>
			<input
				type="text"
				name="displayCode"
				placeholder="Enter Display Code here"
				class="my-2 w-full rounded-md border border-gray-300 p-2 shadow-lg shadow-slate-500 focus:border-blue-300 focus:outline-none focus:ring"
			/>

			<label for="defaultSectionNumbering" class="text-md">Default Section Numbering</label>
			<input
				type="checkbox"
				name="defaultSectionNumbering"
				placeholder="Enter Default Section Numbering here..."
				class="mx-5 my-4 rounded-md border border-gray-300 p-2 shadow-lg shadow-slate-500 focus:border-blue-300 focus:outline-none focus:ring"
			/>

			<div class="flex justify-end p-2">
				<button
					type="submit"
					class="mx-auto mt-12 flex h-14 w-52 items-center rounded-xl bg-cyan-700 p-4 text-center text-lg text-white shadow-lg shadow-slate-500 hover:bg-slate-800 hover:text-white"
					>Add Form / Edit Form</button
				>
			</div>
		</form>
	</div>
	<div class="ml-5 w-[35%] rounded-xl bg-slate-300 shadow-xl shadow-slate-800">
		<ul class="h-full rounded-lg p-1 shadow-md">
			{#each assessments as a}
				<a href="new/{a.id}/question"
					><li
						class="m-2 mt-5 h-20 rounded-lg border-2 border-slate-500 bg-slate-400 text-center shadow-xl shadow-slate-500"
					>
						<p class="mt-5 text-xl font-bold text-slate-600">{a.Title}</p>
					</li></a
				>
			{/each}
		</ul>
	</div>
</div>
