<script lang="ts">
	let insertedDivs: { key: number }[] = [];

	function insertDiv() {
		insertedDivs = [...insertedDivs, { key: insertedDivs.length + 1 }];
	}
	function removeDiv(index: number) {
		insertedDivs = insertedDivs.filter((_, i) => i !== index);
	}
</script>

<div class="w-[1000px] h-fit p-2 m-4">
	<button
		type="button"
		on:click={insertDiv}
		value="Add more"
		class="w-24 mr-10 rounded-md h-10 bg-orange-400 float-right p-px mb-2"
		><svg
			class="h-8 w-8 text-black ml-7"
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
			</svg
		></button
	>
	<!-- <div class=" w-[80%]"> -->
	{#each insertedDivs as { key }, index (key)}
		<div class="p-3 bg-[#7baeed] w-[70%]">
			<!-- <div class="w-1/2"> -->
			<input type="radio" />
			<input type="text" placeholder={'Enter option ' + (index + 1)} class="w-[80%]" />
			<!-- </div> -->

			<!-- <div class="w-1/2">
					<input type="radio" class="ml-4" />
					<input type="text" placeholder={`Enter option ${index * 2 + 2}`} class="ml-2" />
				</div> -->
			<button class="mt-[8px] ml-20" type="button" value="remove" on:click={() => removeDiv(index)}>
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
					<line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" />
					<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
					<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg
				>
			</button>
		</div>
	{/each}
</div>
<!-- <div class=" w-[20%]">
		
	</div> -->
<!-- </div> -->
