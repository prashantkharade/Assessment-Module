<script lang="ts">
	import SecondNavbar from '../../../../lib/components/SecondNavbar.svelte';
	import Icon from '@iconify/svelte';
	// import { sharedData } from '$lib/title';
	import { enhance } from '$app/forms';
	let name = '';
	const dataToShare = { name };

	// Set the shared data
	// sharedData.set(dataToShare);

	let assessmentData = {
		// Title: '',
		Description: '',
		// Type: '',
		Provider: '',
		ProviderAssessmentCode: ''
	};

	export let form;
</script>

<SecondNavbar />
<div class="flex flex-row">
	<div class="container mx-auto">
		<form
			use:enhance
			method="post"
			action="?/new"
			class="h-screen rounded-lg border border-violet-800 bg-violet-300 p-8 shadow-md dark:border-cyan-500"
		>
			<table class="m-4 table w-full">
				<thead class="mb-8 w-full text-cyan-600">
					<tr class=" ">
						<th class="text-left text-2xl">Create Assessment Template</th>
						<th class="float-end px-2 py-2 text-end">
							<Icon icon="material-symbols:close-rounded" class="text-3xl" />
						</th>
					</tr>
				</thead>
				<tbody class=" bg-white dark:bg-inherit">
					<tr class="border-b-2 bg-violet-200">
						<td class="px-12 py-2 text-gray-700">Title </td>
						<td>
							<input
								type="text"
								name="title"
								required
								placeholder="Enter title here..."
								class="my-2 w-full border p-2 {form?.errors?.title
									? 'border-error-300 text-error-500'
									: 'border-gray-300'} rounded-md focus:border-blue-300 focus:outline-none focus:ring"
							/>
							{#if form?.errors?.title}
								<p class="text-error-500 mt-1 text-xs">{form?.errors?.title[0]}</p>
							{/if}
						</td>
					</tr>
					<tr class=" rounded-2xl py-8">
						<td class="rounded-2xl px-12 py-6 align-top">Description</td>
						<td>
							<textarea
								name="Description"
								bind:value={assessmentData.Description}
								placeholder="Enter description here..."
								class="my-2 w-full rounded-md border border-gray-300 p-2 focus:border-blue-300 focus:outline-none focus:ring"
							></textarea>
						</td>
					</tr>
					<tr class=" bg-violet-200 py-2">
						<td class="px-12 py-2">Type</td>
						<td class="py-2">
							<select class="select w-full" name="type" placeholder="Select type here...">
								<option class="bg-white text-gray-700" value="Daily Update">Daily Update</option>
								<option class="bg-white text-gray-700" value="Symptoms">Symptoms</option>
								<option class="bg-white text-gray-700" value="Survey">Survey</option>
								<option class="bg-white text-gray-700" value="Protocol">Protocol</option>
								<option class="bg-white text-gray-700" value="Custom">Custom</option>
							</select>
						</td>
					</tr>
					<tr class=" py-2 dark:border-b-yellow-700">
						<td class="px-12 py-2">Provider</td>
						<td class="py-2">
							<input
								bind:value={assessmentData.Provider}
								type="text"
								name="provider"
								placeholder="Enter provider here"
								class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</td>
					</tr>
					<tr class=" bg-violet-200 py-2 dark:border-b-yellow-700">
						<td class="px-12 py-2">Provider Assessment Code</td>
						<td class="py-2">
							<input
								bind:value={assessmentData.ProviderAssessmentCode}
								type="text"
								name="providerAssessmentCode"
								placeholder="Enter provider assessment code here..."
								class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</td>
					</tr>
				</tbody>
			</table>

			<div class="flex justify-end p-2">
				<button
					type="submit"
					class="m-4 ml-[22rem] mt-20 h-20 w-52 rounded-xl bg-purple-800 p-4 text-white hover:bg-cyan-600 hover:text-black"
					>Add Form / Edit Form</button
				>
			</div>
		</form>
	</div>
</div>
