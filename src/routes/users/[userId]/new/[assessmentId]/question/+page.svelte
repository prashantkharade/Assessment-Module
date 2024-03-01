<script lang="ts">
	import type { PageServerData } from './$types';
	// import { invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';

	//////////////////////////////////////////////////////////////////////////////////////

	import SecondNavbar from '../../../../../../lib/components/SecondNavbar.svelte';
	import Dropdown from '$lib/components/Input.option/dropdown.svelte';
	import Checkbox from '$lib/components/Input.option/checkbox.svelte';
	import Files from '$lib/components/Input.option/file.svelte';
	import Confirm from '$lib/components/ConfirmModel.svelte';
	import MultipleChoices from '$lib/components/Input.option/multipleChoices.svelte';
	import SingleChoice from '$lib/components/Input.option/singleChoice.svelte';
	// import { page } from '$app/stores';

	/////////////////////////////////////////////////////////////////////////////////////
	export let data: PageServerData;
	console.log(data.assessmentTemplate.Title);
	$: questionList = data.assessmentNodes;
	const templateId = $page.params.assessmentId;
	const userId = $page.params.userId;

	$: isEmpty = !title || !queryType;

	let title;
	let queryType;

	function handleChange(event) {
		queryType = event.target.value;
	}

	const handleDelete = async (e, id) => {
		const assessmentNodeId = id;
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: templateId,
			assessmentNodeId: assessmentNodeId
		});
		invalidate('app:allNodes');
	};

	async function Delete(model) {
		console.log(model);
		const response = await fetch(`/api/server`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<SecondNavbar />
<div class="flex flex-row">
	<div class="h-screen w-[70%] rounded-xl bg-lime-100">
		<section class="m-2 h-fit w-[65rem] rounded-3xl bg-slate-200 p-2">
			<form action="?/createAssessmentNodeAction" method="post" use:enhance class="w-full">
				<table class="mt-[10px] table w-full">
					<tbody>
						<tr>
							<td
								colspan="2"
								class="h-12 rounded-3xl bg-blue-300 text-center text-2xl font-bold text-blue-600"
							>
								Enter Form Question
							</td>
						</tr>
						<tr class="bg-purple-50">
							<td>
								<h1 class="ml-10 text-lg font-bold text-slate-700">Enter node type</h1>
							</td>
							<td class="py-2">
								<select
									name="nodeType"
									placeholder="Select node type here..."
									class="select ml-[1%] h-12 w-[90%] rounded-xl border p-2"
								>
									<!-- on:change={(val) => onSelectNodeType(val)} -->
									<option>Question</option>
									<option>Message</option>
									<option>Node list</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>
								<h1 class="ml-10 text-lg font-bold text-slate-700">Add your question ?</h1>
							</td>
							<td class="py-2">
								<input
									type="text"
									name="title"
									placeholder="Add your question ?"
									class="ml-[1%] h-12 w-[90%] rounded-xl border focus:border-blue-300 focus:outline-none focus:ring"
								/>
							</td>
						</tr>

						<tr class="bg-purple-50">
							<td>
								<h1 class="ml-10 text-lg font-bold text-slate-700">Enter Parent node here...</h1>
							</td>
							<td class="py-2">
								<select
									name="parentNodeId"
									class="select ml-[1%] h-12 w-[90%] rounded-xl border"
									placeholder="Select node type here..."
									><option value="2b3b3ea7-d55f-46fb-901f-380a92be0059"
										>2b3b3ea7-d55f-46fb-901f-380a92be0059</option
									>
									<option value="2b3b3ea7-d55f-46fb-901f-380a92be0059"
										>2b3b3ea7-d55f-46fb-901f-380a92be0059</option
									>
									<!-- {#each assessmentNodes as node}
						<option value={node.id}>{node.NodeType} - {node.Title} - {node.DisplayCode}</option>
					{/each} -->
								</select>
							</td>
						</tr>

						<tr class="">
							<td>
								<h1 class="ml-10 text-lg font-bold text-slate-700">Enter description here...</h1>
							</td>
							<td class="py-2">
								<textarea
									name="description"
									placeholder="Enter description here..."
									class="input ml-[1%] h-12 w-[90%] rounded-xl border p-2"
								/>
							</td>
						</tr>

						<tr class="bg-purple-50">
							<td
								><h1 class="ml-10 text-lg font-bold text-slate-700">
									serve List Node Children at once
								</h1></td
							>
							<td class="py-2">
								<input
									placeholder="serve List Node Children at once"
									type="checkbox"
									name="serveListNodeChildrenAtOnce"
									value="true"
									class="checkbox ml-[1%] border"
								/>
							</td>
						</tr>
						<tr>
							<td><h1 class="ml-10 text-lg font-bold text-slate-700">Enter sequence here..</h1></td>
							<td class="py-2"
								><input
									type="number"
									name="sequence"
									placeholder="Enter sequence here..."
									min="1"
									class="input ml-[1%] h-12 w-[90%] rounded-xl"
								/></td
							>
						</tr>
						<tr class="bg-purple-50">
							<td><h1 class="ml-10 text-lg font-bold text-slate-700">Enter question type..</h1></td>
							<td class="py-2">
								<button type="button">
									<select
										class="select ml-[1%] h-12 w-full rounded-xl border p-2"
										name="queryType"
										on:change={handleChange}
									>
										<option value="text">Text</option>
										<!-- <option value="Careplan">Careplan</option> -->
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
							</td>
						</tr>
					</tbody>
				</table>

				<div class="">
					{#if isEmpty}
						<p class="ml-[20rem] mt-[20px] text-[#ec8954]">Please fill out all form fields</p>
					{/if}
				</div>

				{#if queryType === 'text'}
					<div class=" mt-3 bg-green-500">
						<input type="text" placeholder="Enter text here" class="w-full" />
					</div>
				{:else if queryType === 'multiplechoice'}
					<div><MultipleChoices /></div>
				{:else if queryType === 'singlechoice'}
					<div><SingleChoice /></div>
				{:else if queryType === 'checkbox'}
					<div><Checkbox /></div>
				{:else if queryType === 'dropdown'}
					<div><Dropdown /></div>
				{:else if queryType === 'file'}
					<div><Files /></div>
				{:else if queryType === 'number'}
					<div class="mt-3 bg-green-500 p-3"></div>
				{:else if queryType === 'date'}
					<div class="mt-3 bg-green-500 p-3">This is the date div.</div>
				{:else if queryType === 'time'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else if queryType === 'float'}
					<div class="mt-3 bg-green-500 p-3">This is the number div.</div>
				{:else if queryType === 'integer'}
					<div class="mt-3 bg-green-500 p-3">This is the date div.</div>
				{:else if queryType === 'boolean'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else if queryType === 'datetime'}
					<div class="mt-3 bg-green-500 p-3">This is the number div.</div>
				{:else if queryType === 'rating'}
					<div class="mt-3 bg-green-500 p-3">This is the date div.</div>
				{:else if queryType === 'location'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else if queryType === 'range'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else}
					<div class="">No type selected.</div>
				{/if}

				<button class="relative ml-[83%] h-10 w-32 rounded border-r-2 bg-slate-500"
					>Add Question</button
				>
				<!-- class:disabled={isEmpty}
					disabled={isEmpty} -->
			</form>
		</section>
	</div>
	<div class="h-screen w-[30%] rounded-xl bg-slate-200 p-2">
		<div class="h-12 rounded-full bg-blue-300 text-center text-xl font-bold text-blue-600">
			<p class="">{data.assessmentTemplate.Title}</p>
		</div>
		{#if questionList && questionList.length > 0}
			<ul>
				{#each questionList as node}
					<li class="m-2 flex flex-row">
						<div
							class="h-12 w-10/12 rounded-full border-b-2 border-r-4 border-solid border-gray-700 bg-cyan-50 text-center hover:bg-cyan-200"
						>
							{node.Title}{node.id}
						</div>
						<div class="flex h-12 w-2/12 flex-row">
							<button
								type="button"
								class="ml-1 h-full w-[50%] rounded-full text-white hover:bg-slate-300"
							>
								<a href="question/{node.id}" class="btn hover:variant-soft-primary">
									<Icon
										icon="material-symbols:edit-outline-rounded"
										class="text-2xl text-red-500"
									/>
								</a>
							</button>

							<button
								on:click|preventDefault={(e) => handleDelete(e, node.id)}
								class="btn -my-1 h-full rounded-full p-1 hover:bg-red-300"
							>
								<Icon
									icon="material-symbols:delete-outline-rounded"
									class="text-2xl text-red-800"
								/>
							</button>

							<!-- <Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => handleDelete(e, node.id)}
							>								
								<button
									on:click|preventDefault={() => confirmThis(handleDelete, node.id)}
									class="btn -my-1 h-full rounded-full p-1 hover:bg-slate-300"
								>								
									<Icon icon="material-symbols:delete-outline-rounded" class="text-2xl" />
								</button>
								<span slot="title">Delete</span>
								<span slot="description">
									Are you sure you want to delete this question.....?
								</span>
							</Confirm> -->
						</div>
					</li>
				{/each}
			</ul>
		{/if}
		<button class="ml-20 h-12 w-80 rounded-full bg-blue-400 hover:bg-sky-800 hover:text-white"
			>Clear All</button
		>
	</div>
</div>
