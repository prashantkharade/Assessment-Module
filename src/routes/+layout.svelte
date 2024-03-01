<script lang="ts">
	import '../app.pcss';
	// import SecondNavbar from '../components/SecondNavbar.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	export let data: LayoutData;

	// console.log($page);
</script>

<header>
	<!-- Navbar -->
	<nav class=" p-3 h-14 w-full bg-sky-700">
		<div class=" flex justify-between">
			<!-- <svg
					class="h-5 w-5 text-slate-50 mt-1"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
					<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
				</svg> -->
			<h1 class="flex flex-row">
				<svg class="h-7 w-7 text-slate-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
					/>
				</svg>

				<p class="text-slate-50 ml-2 text-lg">FORMS</p>
			</h1>

			<!-- Navigation links -->
			<div class="items-center justify-between mx-auto relative mr-2">
				<!-- File Dropdown Container -->
				<div id="fileDropdown" class="z-10 hidden absolute mt-2 font-normal bg-white">
					<ul class="text-sm text-black" aria-labelledby="dropdownFileButton">
						<!-- File dropdown options -->
						<li>
							<a
								href="word"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
								>New...</a
							>
						</li>
						<li>
							<a
								href="new"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
								>Load...</a
							>
						</li>
						<li>
							<a
								href="new"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
								>Save...</a
							>
						</li>
						<li>
							<a
								href="new"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
								>Save as...</a
							>
						</li>
						<li>
							<a
								href="new"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
								>History...</a
							>
						</li>
						<li>
							<a
								href="new"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
								>Properties...</a
							>
						</li>
					</ul>
				</div>
				<div id="viewDropdown" class="z-10 hidden absolute mt-2 font-normal bg-white">
					<ul class="text-sm text-black" aria-labelledby="dropdownViewButton">
						<!-- View dropdown options -->
						<!-- <li>
							<a
								href="put links here"
								class=" px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Toggle Table Fields'</a
							>
						</li> -->
						<li>
							<a
								href="Tooggle Relationships"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Toggle Relationships</a
							>
						</li>
						<li>
							<a
								href="Tooggle Minimap "
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Toggle Minimap</a
							>
						</li>
						<li>
							<a
								href=" Toggle Sidebar"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Toggle Sidebar</a
							>
						</li>
						<li>
							<a
								href=" Toggle Grid"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Toggle Grid</a
							>
						</li>
						<li>
							<a
								href="Line Type"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Line Type</a
							>
						</li>
						<li>
							<a
								href="Show Tutorial"
								class="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Show Tutorial</a
							>
						</li>
						<!-- Add other view-related options as needed -->
					</ul>
				</div>
				<!-- Dropdown Buttons  -->
				<div class="flex flex-row font-bold">
					<!-- File Dropdown Button -->
					<div class="flex flex-row mr-4 hover:bg-gray-400">
						<img src="/menu.png" alt="menu" class="w-[10px] h-[10px] ml-2 mt-3" />
						<button
							id="fileDropdownLink"
							data-dropdown-toggle="fileDropdown"
							class="flex items-center py-2 px-2 text-sm rounded text-white"
						>
							Home
							<svg
								class="w-2 h-2 ms-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
					</div>
					<!-- View Dropdown Button -->
					<div class="flex flex-row hover:bg-gray-400">
						<img src="/eye.png" alt="menu" class="w-[12px] h-[12px] ml-2 mt-3" />
						<button
							id="viewDropdownLink"
							data-dropdown-toggle="viewDropdown"
							class="flex items-center py-2 px-2 text-sm rounded text-white"
						>
							View
							<svg
								class="w-2 h-2 ms-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
					</div>
					<div class="flex flex-row hover:bg-gray-400">
						<img src="/eye.png" alt="menu" class="w-[12px] h-[12px] ml-2 mt-3" />
						<button
							id="viewDropdownLink"
							data-dropdown-toggle="viewDropdown"
							class="flex items-center py-2 px-2 text-sm rounded text-white"
						>
							About
							<svg
								class="w-2 h-2 ms-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
					</div>
					<div class="flex flex-row hover:bg-gray-400">
						<img src="/eye.png" alt="menu" class="w-[12px] h-[12px] ml-2 mt-3" />
						<button
							id="viewDropdownLink"
							data-dropdown-toggle="viewDropdown"
							class="flex items-center py-2 px-2 text-sm rounded text-white"
						>
							Services
							<svg
								class="w-2 h-2 ms-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
					</div>
					<!-- <svg class="h-8 w-8 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg> -->
					<div>
						<svg
							class="h-10 w-10 text-red-200 flex flex-row"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
<!-- <SecondNavbar /> -->
<slot />
<footer class=" h-12 w-full bg-cyan-500 text-center text-slate-950 font-bold text-xl">
	Mr. Prashant kharade
</footer>
