<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentUser, pb } from './pocketbase';
	let newMessage: string;
	let messages: Array<any> = [];
	let page: number = 1;
	let loading: boolean = false;
	/*
	var loading= false;
$(window).scroll(function() {
    if (!loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - 100)) {
        loading= true;

        // your content loading call goes here.

        loading = false; // reset value of loading once content loaded
    }
});
	*/
	let unsubscribe: () => void;
	onMount(async () => {
		// Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created'
		});
		messages = resultList.items;
		// Subscribe to realtime messages
		unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				messages = [...messages, record];
			}
			if (action === 'delete') {
				messages = messages.filter((m) => m.id !== record.id);
			}
		});
		console.log(messages);
		document.addEventListener('keydown', (event) => {
			if (event.code != 'Enter' || !event.isTrusted) return;
			if (event.shiftKey) return;
			sendMessage();
		});
		window.addEventListener('scroll', async () => {
			console.log(window.scrollY);
			if (!loading && window.scrollY < 300  && messages.length % 50 == 0) {
				loading = true;
				page++;
				const resultList = await pb.collection('messages').getList(page, 50, {
					sort: 'created'
				});
				console.log("added!");
				messages = resultList.items.concat(messages);
				console.log(messages);
				loading = false;
			}
		});
		window.scrollTo(0, document.body.scrollHeight);
	});
	// Unsubscribe from realtime messages
	onDestroy(() => {
		unsubscribe?.();
	});
	async function sendMessage() {
		if (!newMessage.trim().replace('\n', '').length) return;
		const data = {
			text: newMessage,
			username: $currentUser?.randomName || 'Unknown'
		};
		await pb.collection('messages').create(data);
		newMessage = '';
		window.scrollTo(0, document.body.scrollHeight);
	}
</script>

<div class="w-full z-10 flex pl-64 pb-28 pt-10 pr-4">
	<div class="flex flex-col nowrap w-full max-w-4xl mx-auto gap-4">
		{#each messages as message (message.id)}
			<div class="max-w-4xl w-full break-before-auto break-words grid grid-cols-12 gap-2">
				<img
					class="rounded-full aspect-square w-full min-w-[20px] max-w-[40px] col-span-1 mx-auto"
					src={`https://api.dicebear.com/6.x/big-ears-neutral/svg?seed=${message?.username}`}
					alt="avatar"
					width="40px"
				/>
				<div class="col-span-11">
					<p class="text-slate-300 font-semibold -mt-1">@{message?.username}</p>
					<p class="text-slate-400">{message?.text}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
<form
	class="fixed bottom-0 left-0 w-full h-28 z-20 flex items-center justify-center pl-60 py-4 bg-gradient-to-t from-slate-800 from-50% to-transparent"
	on:submit|preventDefault={sendMessage}
>
	<div
		class="w-full max-w-4xl px-2 mx-4 flex flex-row flex-nowrap bg-slate-900 text-slate-300 border border-slate-300/20 rounded-md"
	>
		<textarea
			class="p-2 h-11 resize-none w-full outline-none bg-transparent"
			placeholder="Message"
			bind:value={newMessage}
		/>
		<button class="hover:text-sky-400" type="submit">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-brand-telegram"
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
				<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
			</svg>
		</button>
	</div>
</form>
