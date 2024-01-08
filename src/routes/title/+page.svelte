<script>
	import SecondNavbar from '../../components/SecondNavbar.svelte';

	// let name = '';

	import { myData } from './title';

	let name = '';

	myData.set(name);
</script>

<SecondNavbar />
<div class="flex flex-row">
	<div class="h-screen w-[70%] bg-lime-100 rounded-xl">
		<form action="" class="m-4 p-4 mt-10">
			<input
				type="text"
				placeholder="Add your Form title here...."
				class="h-12 w-full bg-sky-200 rounded-xl"
				bind:value={name}
			/>
			<input
				type="text"
				placeholder="Add the desription about from"
				class="mt-10 h-16 bg-red-200 w-full rounded-xl"
			/>
			<a href="./new">
				<button
					class="mt-20 bg-purple-800 m-4 p-4 h-20 w-52 rounded-xl ml-[22rem] hover:bg-cyan-600 text-white hover:text-black"
					>Add Form / Edit Form</button
				></a
			>
		</form>
	</div>
	<div class="h-screen w-[30%] bg-slate-200 rounded-xl">
		<p class="text-3xl text-center">{name}</p>
	</div>
</div>
