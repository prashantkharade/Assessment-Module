<!-- <script lang="ts">
  import { setContext, onMount, afterUpdate } from "svelte";
	
	import { fly } from "svelte/transition";
 	 import { flip } from "svelte/animate";
	  function removeQuestion(id) {
		QuestionsArray = QuestionsArray.filter((item) => item.id !== id);

  }
  setContext("remove", removeQuestion);
  function setLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(QuestionsArray));
  }

  onMount(() => {
  QuestionsArray = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("QuestionsArray"))
      : [];
  });

  afterUpdate(() => {
    setLocalStorage();
  });
</script>

<div>

</div>
<div class="bg-lime-500 w-full h-12 flex flex-row mb-2">

	<div class="w-10/12 border-r-4 border-b-2 border-solid border-gray-700 bg-cyan-500 h-12">
		{#each QuestionsArray as question,index(question.id)}
		<div
        in:fly={{ x: 200, delay: (index + 1) * 700 }}
        out:fly={{ x: -200 }}
        animate:flip
      >
	  </div>
		{/each}
	</div>
	<div class="w-2/12 bg-teal-500 h-12">
		<button
			type="button"
			class="w-full h-full bg-red-500 text-white"
			on:click={() => removeQuestion(id)}>Delete</button
		>
	</div>
</div>

 -->
