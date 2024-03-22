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
	// console.log('This data is from svelte page', data.assessmentNodes.QueryResponseType);
	let queryResponseTypes = data.assessmentNodes.QueryResponseType;
	const assessmentNodes = data.assessmentNodes;
	let id = data.assessmentNodes.id;
	let nodeType = data.assessmentNodes.NodeType;
	let title = data.assessmentNodes.Title;
	let description = data.assessmentNodes.Description;
	let queryType = data.assessmentNodes.QueryResponseType;
	let options = data.assessmentNodes.Options ?? [];
	let optionValueStore = options;
	let message = data.assessmentNodes.Message ?? null;
	let parentNodeId = data.assessmentNodes.ParentNodeId;
	let sequence = data.assessmentNodes.Sequence;

	let questionList = data.assessmentNodes;
	// console.log('This data is from svelte page',queryType);
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

	function handleChange(event) {
		queryType = event.target.value;
	}

	let insertedDivs: { key: number }[] = [];
	function insertDiv() {
		insertedDivs = [...insertedDivs, { key: insertedDivs.length + 1 }];
	}
	function removeDiv(index: number) {
		insertedDivs = insertedDivs.filter((_, i) => i !== index);
	}
</script>

<SecondNavbar {userId}/>

<div class="flex h-screen flex-row p-5">
	<div class="m-2 h-fit w-[70%] rounded-3xl bg-slate-200 p-2 shadow-xl shadow-black">
		<!-- <section class=""> -->
		<form action="?/createAssessmentNodeAction" method="post" use:enhance class="w-full">
			<table class="mt-[10px] table w-full">
				<tbody>
					<tr>
						<td
							colspan="2"
							class="h-12 rounded-xl bg-slate-400 text-center text-2xl font-bold text-slate-700"
						>
							Enter Form Question
						</td>
					</tr>
					<tr class="">
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

					<tr class="">
						<td>
							<h1 class="ml-10 text-lg font-bold text-slate-700">Enter Parent node here...</h1>
						</td>
						<td class="py-2">
							<select
								name="parentNodeId"
								class="select ml-[1%] h-12 w-[90%] rounded-xl border"
								placeholder="Select node type here..."
							>
								<!-- <option value="2b3b3ea7-d55f-46fb-901f-380a92be0059"
										>2b3b3ea7-d55f-46fb-901f-380a92be0059</option
									>
									<option value="2b3b3ea7-d55f-46fb-901f-380a92be0059"
										>2b3b3ea7-d55f-46fb-901f-380a92be0059</option
									> -->
								{#each questionList as node}
									<option value={node.id}
										>{node.NodeType} - {node.Title} - {node.DisplayCode}</option
									>
								{/each}
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

					<tr class="">
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
					<tr class="">
						<td><h1 class="ml-10 text-lg font-bold text-slate-700">Enter question type..</h1></td>
						<td class="py-2">
							<button type="button">
								<select
									class="select ml-[1%] h-12 w-full rounded-xl border p-2"
									name="queryType"
									on:change={handleChange}
								>
									<option value="text">Text</option>
									<option value="float">Float</option>
									<option value="integer">Integer</option>
									<option value="boolean">Boolean</option>
									<option value="object">Object</option>
									<option value="textArray">Text Array</option>
									<!-- <option value="floatArray">Float Array</option> -->
									<!-- <option value="integerArray">Integer Array</option> -->
									<!-- <option value="booleanArray">Boolean Array</option> -->
									<!-- <option value="objectArray">Object Array</option> -->
									<option value="SingleChoiceSelection">Single choice</option>
									<!-- <option value="multiplechoice">Multiple choice</option> -->
									<option value="MultiChoiceSelection">Checkbox</option>
									<option value="dropdown">Drop-down</option>
									<option value="file">File</option>
									<!-- <option value="number">Number</option> -->
									<option value="date">Date</option>
									<!-- <option value="time">Time</option> -->
									<option value="dateTime">DateTime</option>
									<option value="rating">Rating</option>
									<option value="location">Location</option>
									<option value="range">Range</option>
									<!-- <option value="biometric">Biometric</option> -->
									<!-- <option value="ok">OK</option> -->
									<option value="none">None</option>
								</select>
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			{#if queryType === 'SingleChoiceSelection' || queryType === 'MultiChoiceSelection' || queryType === 'dropdown'}
				<div class="m-4 h-fit w-[1000px] p-2">
					<button
						type="button"
						on:click={insertDiv}
						value="Add more"
						class="float-right mb-2 mr-10 h-10 w-24 rounded-md bg-orange-400 p-px"
						><svg
							class="ml-7 h-8 w-8 text-black"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
							<line x1="12" y1="8" x2="12" y2="16" />
							<line x1="8" y1="12" x2="16" y2="12" />
						</svg></button
					>

					{#each insertedDivs as { key }, index (key)}
						<div class="w-[70%] bg-[#7baeed] p-3">
							<input type="radio" />
							<input
								type="text"
								placeholder={'Enter option ' + (index + 1)}
								class="w-[80%]"
								name="options"
							/>

							<button
								class="ml-20 mt-[8px]"
								type="button"
								value="remove"
								on:click={() => removeDiv(index)}
							>
								<svg
									class="h-6 w-6 text-pink-500"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" /> <line x1="4" y1="7" x2="20" y2="7" />
									<line x1="10" y1="11" x2="10" y2="17" />
									<line x1="14" y1="11" x2="14" y2="17" />
									<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
									<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg
								>
							</button>
						</div>
					{/each}
				</div>
			{:else if !queryType}
				<div class="">No type selected.</div>
			{/if}

			<button class="relative ml-[83%] h-10 w-32 rounded border-r-2 bg-slate-500"
				>Add Question</button
			>
			<!-- class:disabled={isEmpty}
					disabled={isEmpty} -->
		</form>
		<!-- </section> -->
	</div>
	<div class="parent-div relative h-auto w-[30%] overflow-hidden rounded-xl bg-slate-200 p-2">
		<div
			class="sticky top-0 z-10 h-12 rounded-xl bg-slate-400 text-center text-xl font-bold text-slate-700"
		>
			<!-- <p class="">{data.assessmentTemplate.Title}</p> -->
		</div>
		<div class="max-h-[calc(100%-3rem)] overflow-y-auto">
			{#if questionList && questionList.length > 0}
				<ul>
					{#each questionList as node}
						<li class="m-2 mt-4 flex flex-row">
							<div
								class="h-12 w-full rounded-2xl border-b-2 border-r-4 border-solid border-gray-700 bg-slate-50 text-center shadow-xl shadow-slate-600 hover:bg-slate-300"
							>
								{node.Title}...{node.QueryResponseType}
							</div>
					
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>