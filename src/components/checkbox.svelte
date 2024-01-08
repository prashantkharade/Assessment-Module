<script lang="ts">
	let insertedDivs: { key: number }[] = [];

	function insertDiv() {
		insertedDivs = [...insertedDivs, { key: insertedDivs.length + 1 }];
	}
</script>

<div class=" h-10 w-full">
	<div>
		<input
			type="button"
			on:click={insertDiv}
			class=" h-12 w-20 bg-orange-300 rounded-full float-right"
			value="Add"
		/>
	</div>
	{#each insertedDivs as { key }, index (key)}
		<div class="p-3 bg-[#7baeed]" {key}>
			{index + 1}.
			<input type="checkbox" />
			<input type="text" placeholder="Enter option {index+1}" />
			<!-- <input type="button" value="Add" on:click={insertDiv}/> -->
		</div>
	{/each}
</div>
