<script lang="ts">
	import MultipleChoices from '$lib/components/Input.option/multipleChoices.svelte';
	import Dropdown from '$lib/components/Input.option/dropdown.svelte';
	import SingleChoice from '$lib/components/Input.option/singleChoice.svelte';
	import Checkbox from '$lib/components/Input.option/checkbox.svelte';
	import Files from '$lib/components/Input.option/file.svelte';
	import SecondNavbar from '$lib/components/SecondNavbar.svelte';
	import { enhance } from '$app/forms';
	import type { PageServerData } from '../$types';

	//////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	// console.log('This data is from svelte page', data);
	const queryResponseTypes = data.queryResponseTypes;
	const assessmentNodes = data.assessmentNodes;
	let id = data.assessmentNode.id;
	let nodeType = data.assessmentNode.NodeType;
	let title = data.assessmentNode.Title;
	let description = data.assessmentNode.Description;
	let queryType = data.assessmentNode.QueryResponseType;
	let options = data.assessmentNode.Options ?? [];
	let optionValueStore = options;
	let message = data.assessmentNode.Message ?? null;
	let parentNodeId = data.assessmentNode.ParentNodeId;
	let sequence = data.assessmentNode.Sequence;

	let questionList = data.assessmentNodes;
	// console.log('Question list is', questionList);
	// console.log(typeof questionList);

	//Original data
	let _nodeType = nodeType;
	let _title = title;
	let _description = description;
	let _queryType = queryType;
	let _sequence = sequence;
	let _message = message;

	function handleReset() {
		nodeType = _nodeType;
		title = _title;
		description = _description;
		queryType = _queryType;
		sequence = _sequence;
		message = _message;
	}

	let selectedNodeType = nodeType;
	let selectedQueryType = queryType;

	const onSelectQueryResponseType = (val) => (selectedQueryType = val.target.value);
</script>

<SecondNavbar />

<div class="flex flex-row">
	<div class="h-screen w-[70%] rounded-xl bg-lime-100">
		<section class="m-2 h-fit w-[65rem] rounded-3xl bg-slate-200 p-2">
			<form action="?/update" method="post" use:enhance class="w-full">
				<table class="mt-[10px] table w-full">
					<tbody>
						<tr>
							<td
								colspan="2"
								class="h-12 rounded-3xl bg-blue-300 text-center text-2xl font-bold text-blue-600"
							>
								Edit this Question
							</td>
						</tr>
						<tr class="bg-purple-50">
							<td>
								<h1 class="ml-10 text-lg font-bold text-slate-700">Node Type</h1>
							</td>
							<td class="py-2">
								<!-- <select
									name="nodeType"
									placeholder="Select node type here..."
									class="select ml-[1%] h-12 w-[90%] rounded-xl border p-2"
								>
									<option>Question</option>
									<option>Message</option>
									<option>Node list</option>
								</select> -->

								<input type="hidden" name="nodeType" bind:value={nodeType} class="input" />
							</td>
						</tr>
						<tr>
							<td>
								<h1 class="ml-10 text-lg font-bold text-slate-700">Question</h1>
							</td>
							<td class="py-2">
								<input
									type="text"
									name="title"
									placeholder="Add your question ?"
									bind:value={title}
									class="ml-[1%] h-12 w-[90%] rounded-xl border focus:border-blue-300 focus:outline-none focus:ring"
								/>
							</td>
						</tr>

						<tr class="bg-purple-50">
							<td>
								<h1 class="ml-10 text-lg font-bold text-slate-700">Parent Node</h1>
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
									bind:value={description}
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
										bind:value={queryType}
										on:change={(val) => onSelectQueryResponseType(val)}
									>
										<option selected value={queryType}>{queryType}</option>
										{#each queryResponseTypes as responseType}
											<option value={responseType}>{responseType}</option>
										{/each}
										<!-- <option value="text">Text</option>
										
										<option value="multiplechoice">Multiple choice</option>
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
										<option value="object">Object</option>
										<option value="textArray">Text Array</option>
										<option value="floatArray">Float Array</option>
										<option value="integerArray">Integer Array</option>
										<option value="booleanArray">Boolean Array</option>
										<option value="objectArray">Object Array</option>
										<option value="biometric">Biometric</option>

										<option value="dateTime">DateTime</option>
										<option value="rating">Rating</option>
										<option value="location">Location</option>
										<option value="range">Range</option>
										<option value="ok">OK</option>
										<option value="none">None</option> -->
									</select>
								</button>
							</td>
						</tr>
					</tbody>
				</table>

				<!-- <div class="">
					{#if isEmpty}
						<p class="ml-[20rem] mt-[20px] text-[#ec8954]">Please fill out all form fields</p>
					{/if}
				</div>

				{#if formData.Type === 'text'}
					<div class=" mt-3 bg-green-500">
						<input type="text" placeholder="Enter text here" class="w-full" />
					</div>
				{:else if formData.Type === 'multiplechoice'}
					<div><MultipleChoices /></div>
				{:else if formData.Type === 'singlechoice'}
					<div><SingleChoice /></div>
				{:else if formData.Type === 'checkbox'}
					<div><Checkbox /></div>
				{:else if formData.Type === 'dropdown'}
					<div><Dropdown /></div>
				{:else if formData.Type === 'file'}
					<div><Files /></div>
				{:else if formData.Type === 'number'}
					<div class="mt-3 bg-green-500 p-3"></div>
				{:else if formData.Type === 'date'}
					<div class="mt-3 bg-green-500 p-3">This is the date div.</div>
				{:else if formData.Type === 'time'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else if formData.Type === 'float'}
					<div class="mt-3 bg-green-500 p-3">This is the number div.</div>
				{:else if formData.Type === 'integer'}
					<div class="mt-3 bg-green-500 p-3">This is the date div.</div>
				{:else if formData.Type === 'boolean'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else if formData.Type === 'datetime'}
					<div class="mt-3 bg-green-500 p-3">This is the number div.</div>
				{:else if formData.Type === 'rating'}
					<div class="mt-3 bg-green-500 p-3">This is the date div.</div>
				{:else if formData.Type === 'location'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else if formData.Type === 'range'}
					<div class="mt-3 bg-green-500 p-3">This is the time div.</div>
				{:else}
					<div class="">No type selected.</div>
				{/if} -->

				<button class="relative ml-[83%] h-10 w-32 rounded border-r-2 bg-slate-500"
					>Edit Question</button
				>
			</form>
		</section>
	</div>
	<div class="h-screen w-[30%] rounded-xl bg-slate-200 p-2">
		{#if questionList && questionList.length > 0}
			<ul>
				{#each questionList as e}
					<li class="m-2 flex flex-row">
						<div
							class="h-12 w-full rounded-full border-b-2 border-r-4 border-solid border-gray-700 bg-cyan-50 text-center hover:bg-cyan-200"
						>
							{e.Title}
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
