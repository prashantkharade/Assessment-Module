<script lang="ts">
	import SecondNavbar from '$lib/components/SecondNavbar.svelte';
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	export let data: PageServerData;
	const assessments = data.assessmentTemplate.Items;
	let userId = $page.params.userId;
	console.log(assessments, 'This is from user new page');
</script>

<SecondNavbar {userId} />
<div class="flex flex-row">
	<div class="flex h-screen w-[30%] flex-col p-10">
		<div>
			<h1 class="text-2xl text-slate-800">Select your assessment</h1>
		</div>

		<div class="ml-5 rounded-xl bg-slate-300 shadow-xl shadow-slate-800">
			<ul class="h-full rounded-lg p-1 shadow-md">
			
				<form action="?/review" use:enhance method="post">
					{#each assessments as a}
						<a href="/review"

							><li
								class="m-2 mt-5 h-20 rounded-lg border-2 border-slate-500 bg-slate-400 text-center shadow-xl shadow-slate-500"
							>
								<p class="mt-5 text-xl font-bold text-slate-600">{a.Title}</p>
							</li></a
						>

						<!-- <li
							class="m-2 mt-5 h-20 rounded-lg border-2 border-slate-500 bg-slate-400 text-center shadow-xl shadow-slate-500"
						>
							<input
								
								name={a.id}
								placeholder="{a.Title}"
								class="my-2 w-full rounded-md border p-2 shadow-lg shadow-slate-500 focus:border-blue-300 focus:outline-none focus:ring"
							/>
						</li> -->
						<!-- <label class="text-red-500" for="name">{a.title}</label> -->

						<!-- <input type="text" placeholder={a.title} /> -->
						<!-- <button type="submit" name="{a.id}">
							{a.Title}{a.id}
						</button> -->
						<!-- <a href="users/[userId]/review" class="">
						<input type="submit" class="hidden" placeholder="{a.id}">
						</a> -->
					{/each}
				</form>
		
			</ul>
		</div>
	</div>

	<div class="w-[70%] bg-slate-100">
		<ul>
			<li class="bg-red-300 h-5">
				<p></p>
			</li>
		</ul>
	</div>
</div>
