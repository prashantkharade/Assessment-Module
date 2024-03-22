<script>
	export let userId;
	// console.log(userId,"this is from secondnavbar")
</script>

<div class="w-full h-12 bg-slate-300 flex-auto justify-center">
	<nav class="pt-4 pl-[400px] text-justify text-black-500 flex-auto">
		<a href="../title"
			><button
				class="h-8 w-32 text-xl rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
				>Form Title</button
			></a
		>
		
		<a href="../new"
			><button
				class="h-8 w-32 text-xl rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
				>Add question</button
			></a
		>
		<a href="../{[userId]}/review"
			><button
				class="h-8 w-32 text-xl rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
				>Form review</button
			></a
		>
		<a href="responses"
			><button
				class="h-8 w-32 text-xl rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
				>Responses</button
			></a
		>
		<a href="setting"
			><button
				class="h-8 w-32 text-xl rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
				>Setting</button
			></a
		>
	</nav>
</div>
