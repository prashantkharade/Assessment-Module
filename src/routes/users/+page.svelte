<script lang="ts">
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { browser } from '$app/environment';
	import { personRolesStore, genderTypesStore } from '$lib/store/general.store';
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';

////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	personRolesStore.set(data.roles);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.roles));
	let personRoles = [],
		loginRoleId = 1;

	if (browser) {
		const tmp = LocalStorageUtils.getItem('personRoles');
		personRoles = JSON.parse(tmp);
		const adminRole = personRoles?.find((x) => x.RoleName === 'System admin');
		if (adminRole) {
			loginRoleId = adminRole.id;
		}
		LocalStorageUtils.removeItem('prevUrl');
	}

	var systemName = 'Form Builder assessment Module';
</script>

<svelte:head>
	<title>{systemName}</title>
	<meta name="description" content="REAN careplans" />
</svelte:head>

<div class="h-[86vh] w-full flex flex-col items-center justify-center bg-cyan-50">
	<form
		method="post"
		action="?/login"
		class="h-80  shadow-bottom-right  rounded-lg border border-slate-300 bg-fuchsia-300 p-8 pb-1 pt-5 shadow-xl"
		use:enhance
	>
		<!-- <input class="hidden" type="number" name="loginRoleId" value={loginRoleId}> -->
		<div class="hidden h-6 w-full bg-fuchsia-700">
			<input name="loginRoleId" class="hidden" value={loginRoleId} />
		</div>
		<div class="h-50 mt-5 w-full justify-center ">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="mb-2" for="username">
				<span class="text-lg text text-red-700 font-bold">Username / Email</span>
				<span class="label-text-alt" />
			</label>
			<input type="text" name="username" required class="input mb-4 w-full rounded-md" />
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="mb-2" for="password">
				<div class="grid grid-flow-col ">
					<p class="text-lg text-red-700 font-bold">Password / OTP</p>
					<p class="text-slate-800 ml-4 sm:ml-12 text-lg">
						<b>Generate OTP</b>
					</p>
				</div>
			</label>
			<input type="password" name="password" required class=" input w-full rounded-md" />
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable">
				<b class=" text-slate-800 text-lg">Forgot Password?</b>
			</label>

			<button type="submit" class="mt-8 btn mb-6 w-full bg-sky-600 p-2 rounded-md">Login</button>
		</div>
	</form>
</div>

