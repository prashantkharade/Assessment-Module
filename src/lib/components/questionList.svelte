<script lang="ts">
	import QuestionDivision from './questionDivision.svelte';

	export let questionArray = [];
</script>

<section>
	<ul>
		{#each questionArray as ques}
			<div>
				<QuestionDivision {...ques} />
			</div>
		<!-- {:else} -->
			<!-- <h2>No question in list</h2> -->
		{/each}
	</ul>
</section>
