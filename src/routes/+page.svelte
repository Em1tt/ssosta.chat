<script lang="ts">
  import { currentUser, pb } from '$lib/pocketbase'
  import { onMount, onDestroy } from 'svelte'
	let messages: Array<any> = [];
	let unsubscribe: () => void;
  onMount(async () => {
		const resultList = await pb.collection('messages').getList(1, 1000, {
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
    console.log(messages, $currentUser);
  });
  onDestroy(() => {
		unsubscribe?.();
	});
  function OnInput(e: any) {
    const sendButton = document.getElementById("sendMessage") as HTMLElement;
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 2 + 'px'
    sendButton.style.height = 'auto'
    sendButton.style.height = e.target.scrollHeight + 2 + 'px'
  }
</script>

<div class="pb-20 pt-2">
  {#each messages as message}
  <div class="chat {$currentUser?.id == message.user ? "chat-end" : "chat-start"}">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="profile picture"
          
          src="https://api.dicebear.com/6.x/big-ears-neutral/svg?seed={message?.user?.expand().username}"
        />
      </div>
    </div>
    <div class="chat-header">
      @IndocumentibleHippopotamus
      <time class="text-xs opacity-50">12:45</time>
    </div>
    <div class="chat-bubble {$currentUser?.id == message.user ? "chat-bubble-primary" : ""}">{message.content}</div>
  </div>
  {/each}
  <div class="chat chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          src="https://api.dicebear.com/6.x/big-ears-neutral/svg?seed={$currentUser?.email}"
        />
      </div>
    </div>
    <div class="chat-header">
      @IndocumentibleHippopotamus
      <time class="text-xs opacity-50">12:45</time>
    </div>
    <div class="chat-bubble">You were the Chosen One!</div>
  </div>
  <div class="chat chat-end">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          src="https://api.dicebear.com/6.x/big-ears-neutral/svg?seed={$currentUser?.email}"
        />
      </div>
    </div>
    <div class="chat-header">
      Anakin
      <time class="text-xs opacity-50">12:46</time>
    </div>
    <div class="chat-bubble chat-bubble-primary">I hate you!</div>
  </div>
</div>

<div
  class="max-w-5xl pr-10 mx-auto fixed bottom-0 py-5 w-full bg-gradient-to-t from-base-100 via-base-100 to-transparent"
>
  <div class="join flex items-center">
    <textarea
      on:input={OnInput}
      class="w-full resize-none text-primary textarea-bordered textarea max-h-32 join-item rounded-tr-none rounded-br-none"
      name="message"
      id="message"
      rows="1"
    />
    <button class="btn join-item rounded-bl-none rounded-tl-none max-h-32" id="sendMessage">
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
</div>
