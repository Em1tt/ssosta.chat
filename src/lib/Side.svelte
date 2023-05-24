<script lang="ts">
	import { currentUser, pb } from './pocketbase';
	import { generateName } from '$lib/nameGenerator';
	let username: string;
	let password: string;
	let errMessage: string;
	function changeName() {
		if (!$currentUser) return;
		pb.collection('users').update($currentUser.id, { randomName: generateName() });
	}
	function signOut() {
		pb.authStore.clear();
	}
	async function login() {
		await pb
			.collection('users')
			.authWithPassword(username, password)
			.catch((err) => {
				const error = err.response.data;
				errMessage = 'Wrong password or username';
				if (error.identity) return (errMessage = 'Invalid username');
				if (error.password) return (errMessage = 'Invalid password');
			});
	}
	async function signUp() {
		try {
			const data = {
				username,
				password,
				passwordConfirm: password,
				randomName: generateName()
			};
			await pb.collection('users').create(data);
			await login();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<nav
	class="bg-slate-900 w-60 fixed top-0 left-0 h-screen border-r border-r-slate-300/20 p-5 flex flex-col flex-nowrap justify-between"
>
	<h1 class="text-slate-500 text-xl text-center">PROJECT.CHAT</h1>
	<div>
		{#if $currentUser}
			<button on:click={changeName} class="w-full p-2 bg-sky-400 hover:bg-sky-300 rounded-md mb-2"
				>Randomize name</button
			>
			<div class="w-full p-2 flex flex-row flex-nowrap gap-2">
				<img
					class="rounded overflow-hidden"
					src={`https://api.dicebear.com/6.x/big-ears-neutral/svg?seed=${$currentUser?.randomName}`}
					alt="avatar"
					width="30px"
				/>
				<div class="flex flex-col flex-nowrap justify-center">
					<p class="text-slate-300 text-sm">@{$currentUser?.randomName}</p>
					<p class="text-slate-500 text-base">{$currentUser?.username}</p>
				</div>
			</div>
			<button
				on:click={signOut}
				class="p-2 rounded-full hover:bg-slate-300/10 w-full flex flex-row justify-center items-center gap-2 text-sky-400"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-logout"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
					/>
					<path d="M9 12h12l-3 -3" />
					<path d="M18 15l3 -3" />
				</svg> Logout
			</button>
		{:else}
			<form>
				{#if errMessage}
					<p class="mb-2 text-red-400">{errMessage}</p>
				{/if}
				<input
					bind:value={username}
					type="text"
					placeholder="Username"
					class="w-full py-1 px-3 rounded-md border-none bg-slate-800 placeholder:text-slate-500 outline-sky-400 focus:text-sky-400 text-white mb-2"
				/>
				<input
					bind:value={password}
					type="password"
					placeholder="Password"
					class="w-full py-1 px-3 rounded-md border-none bg-slate-800 placeholder:text-slate-500 outline-sky-400 focus:text-sky-400 text-white mb-2"
				/>
				<button on:click={login} class="w-full p-2 bg-sky-400 hover:bg-sky-300 rounded-md mb-2">
					Login
				</button>
				<button
					on:click={signUp}
					class="w-full p-2 bg-orange-400 hover:bg-orange-300 rounded-md mb-2"
				>
					Register
				</button>
			</form>
		{/if}
	</div>
</nav>
