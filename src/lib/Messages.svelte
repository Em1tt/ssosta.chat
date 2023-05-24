<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { currentUser, pb } from './pocketbase';
	let newMessage: string;
	let messages: Array<any> = [];
	let unsubscribe: () => void;
	onMount(async () => {
		// Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		});
		messages = resultList.items;
		// Subscribe to realtime messages
		unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
			if (action === 'create') {
				// Fetch associated user
				const user = await pb.collection('users').getOne(record.user);
				record.expand = { user };
				messages = [...messages, record];
			}
			if (action === 'delete') {
				messages = messages.filter((m) => m.id !== record.id);
			}
		});
	});
	// Unsubscribe from realtime messages
	onDestroy(() => {
		unsubscribe?.();
	});
	console.log($currentUser);
	async function sendMessage() {
		console.log(messages);
		const data = {
			text: newMessage,
			user: $currentUser?.id,
			username: $currentUser?.randomName
		};
		const createdMessage = await pb.collection('messages').create(data);
		newMessage = '';
	}
</script>

<div class="ml-60 bg-slate-200">
	<div class="max-w-4xl mx-auto w-full px-5">
		{#each messages as message (message.id)}
			<div class="msg">
				<img
					class="avatar"
					src={`https://api.dicebear.com/6.x/big-ears-neutral/svg?seed=${message.username}`}
					alt="avatar"
					width="40px"
				/>
				<div>
					<small>
						Sent by @{message.username}
					</small>
					<p class="msg-text">{message.text}</p>
				</div>
			</div>
		{/each}
		<form class="bg-white" on:submit|preventDefault={sendMessage}>
			<input placeholder="Message" type="text" bind:value={newMessage} />
			<button type="submit">Send</button>
		</form>
	</div>
</div>
