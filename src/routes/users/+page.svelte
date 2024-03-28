<script lang="ts">
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { browser } from '$app/environment';
	import { personRolesStore, genderTypesStore } from '$lib/store/general.store';
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';

	////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	// personRolesStore.set(data.roles);
	// LocalStorageUtils.setItem('personRoles', JSON.stringify(data.roles));
	// let personRoles = [],
	// 	loginRoleId = 1;

	// if (browser) {
	// 	const tmp = LocalStorageUtils.getItem('personRoles');
	// 	personRoles = JSON.parse(tmp);
	// 	const adminRole = personRoles?.find((x) => x.RoleName === 'System admin');
	// 	if (adminRole) {
	// 		loginRoleId = adminRole.id;
	// 	}
	// 	LocalStorageUtils.removeItem('prevUrl');
	// }

	let user = data.response.Data;
	let name = user.Username;
	// console.log(name)
	// console.log("from page ",user)
	var systemName = 'Form Builder assessment Module';
</script>

<svelte:head>
	<title>{systemName}</title>
	<meta name="description" content="REAN careplans" />
</svelte:head>

<!-- <div class="flex h-screen items-center justify-center bg-slate-100"> -->
<!-- <div class="grid grid-cols-2 gap-4">
		<form class="space-y-4">
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="countryCode" class="block text-sm font-medium text-gray-700">Country Code</label
				>
				<input
					type="text"
					id="countryCode"
					name="countryCode"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>
			<button type="submit" class="inline-flex items-center rounded-md"></button>
		</form>
	</div>

<div class="mx-auto flex h-screen items-center justify-center bg-slate-100">
	<form
		method="post"
		action="?/login"
		class="h-80 rounded-lg border border-slate-900 bg-slate-300 p-8 pb-1 pt-5 shadow-xl shadow-slate-900"
		use:enhance
	>
		<div class="hidden h-6 w-full bg-fuchsia-700">
			<input name="loginRoleId" class="hidden" value={loginRoleId} />
		</div>
		<div class="h-50 mt-5 w-full justify-center">
			<label class="mb-2" for="username">
				<span class="text text-lg font-bold text-red-400">Username / Email</span>
				<span class="label-text-alt" />
			</label>
			<input type="text" name="username" required class="input mb-4 w-full rounded-md" />

			<label class="mb-2" for="password">
				<div class="grid grid-flow-col">
					<p class="text-lg font-bold text-red-400">Password / OTP</p>
				</div>
			</label>
			<input type="password" name="password" required class=" input w-full rounded-md" />

			<label class="lable" for="password">
				<b class=" text-slate-600">Forgot Password?</b>
			</label>

			<button type="submit" class="btn mb-6 mt-8 w-full rounded-md bg-sky-600 p-2">Login</button>
		</div>
	</form>
</div> -->

<!-- <div class="container p-5 bg-lime-500 w-screen h-screen">
	<div></div>
	<div></div>
</div> -->

<div class="flex w-full flex-row">
	<div class="flex w-[50%] flex-col border border-r-slate-800 p-5 pl-10">
		<div class="mx-auto flex h-screen flex-col items-center justify-center">
			<div>
				<h1 class="mx-auto items-center text-3xl font-bold text-slate-700">Create a New User</h1>
			</div>
			<!-- <div class="mx-auto h-screen items-center justify-center"> -->
			<form
				method="post"
				action="?/NewUser"
				use:enhance
				class="my-auto w-[500px] space-y-6 rounded-lg border border-slate-900 bg-slate-300 p-8 pt-5 shadow-xl shadow-slate-900"
			>
				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label for="countryCode" class="block text-sm font-medium text-gray-700"
						>Country Code</label
					>
					<input
						type="text"
						id="countryCode"
						name="countryCode"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					/>
				</div>
				<button type="submit" class=" btn mb-6 mt-8 w-full rounded-md bg-sky-600 p-2">
					Submit
				</button>
			</form>
			<!-- </div> -->
		</div>
	</div>
	<div class="flex w-[50%] flex-col">
		<div class="mx-auto flex h-screen flex-col items-center justify-center">
			<div class="">
				<h1 class="mx-auto items-center text-xl font-bold text-slate-600">
					Already have an Account
				</h1>
			</div>
			<form
				method="post"
				action="?/login"
				class="h-80 rounded-lg border border-slate-900 bg-slate-300 p-8 pb-1 pt-5 shadow-xl shadow-slate-900"
				use:enhance
			>
				<div class="hidden h-6 w-full bg-fuchsia-700">
					<!-- <input name="loginRoleId" class="hidden" value={loginRoleId} /> -->
				</div>
				<div class="h-50 mt-5 w-full justify-center">
					<label class="mb-2" for="username">
						<span class="text text-lg font-bold text-red-400">Username / Email</span>
						<span class="label-text-alt" />
					</label>
					<input type="text" name="username" required class="input mb-4 w-full rounded-md" />

					<label class="mb-2" for="password">
						<div class="grid grid-flow-col">
							<p class="text-lg font-bold text-red-400">Password / OTP</p>
						</div>
					</label>
					<input type="password" name="password" required class=" input w-full rounded-md" />

					<label class="lable" for="password">
						<b class=" text-slate-600">Forgot Password?</b>
					</label>

					<button type="submit" class="btn mb-6 mt-8 w-full rounded-md bg-sky-600 p-2">Login</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
