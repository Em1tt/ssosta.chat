<script lang="ts">
  import { currentUser, pb } from '$lib/pocketbase'
  import '../app.postcss'
  import { enhance, applyAction } from '$app/forms'
  import Theme from '$lib/theme.svelte'
  let signingOut: boolean = false
  let themes = [
    "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
  ];
</script>

<Theme />
<div class="block h-16 z-50">
  <div class="navbar bg-base-100 shadow-md fixed top-0 z-50">
    <div class="navbar-start">
      <a href="/" class="btn rounded-md btn-ghost normal-case text-xl"
        >random.chat</a
      >
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end z-50">
        {#if $currentUser}
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  src="https://api.dicebear.com/6.x/big-ears-neutral/svg?seed={$currentUser?.email}"
                  alt="hi"
                />
              </div>
            </div>
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 p-2 shadow-md bg-base-100 rounded-box w-60"
          >
            <li>
              <div class="pointer-events-none flex flex-col items-start gap-0">
                <h2 class="font-bold text-primary text-xl">Em1t</h2>
                <p class="break-all text-accent">@IndocumentibleHippopotamus</p>
              </div>
            </li>
            <li class="mt-1">
              <label for="my-drawer" class="btn btn-ghost drawer-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brush"
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
                  <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
                  <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
                  <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
                  <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
                </svg>
                Zmeniť tématiku
              </label>
            </li>
            <li class="mt-1">
              <a class="btn btn-ghost" href="/"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-refresh"
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
                  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                </svg>Regenerovať meno</a
              >
            </li>
            <li class="mt-1">
              <form
                method="POST"
                action="/logout"
                class="p-0"
                use:enhance={() => {
                  signingOut = true
                  return async ({ result }) => {
                    pb.authStore.clear()
                    await applyAction(result)
                    signingOut = false
                  }
                }}
              >
                <button class="btn btn-error w-full">
                  {#if signingOut}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-loader-2 animate-spin"
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
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>Odhlasovanie...
                  {:else}
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
                    </svg>Odhlásiť sa
                  {/if}
                </button>
              </form>
            </li>
          </ul>
        {:else}
          <div class="join">
            <a href="/login" class="btn btn-primary rounded-md join-item"
              >Login</a
            >
            <a href="/register" class="btn btn-secondary rounded-md join-item"
              >Register</a
            >
          </div>
        {/if}
      </div>
    </div>
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
<div class="drawer-side">
  <label for="my-drawer" class="drawer-overlay w-screen h-screen fixed top-0 left-0" />
  <ul class="menu flex-nowrap overflow-y-auto p-4 w-80 h-full bg-base-200 text-base-content fixed left-0 top-0">
    <h4 class="font-bold text-xl">Tématiky</h4>
    <p class="mb-2 flex flex-row gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
      <path d="M12 9h.01"></path>
      <path d="M11 12h1v4h1"></path>
   </svg>Tieto tématiky sú experimentálne a môžu vyzerať zle</p>
    <!-- Sidebar content here -->
    {#each themes as theme}
    <li class="mt-1">
      <button data-set-theme="{theme}" data-act-class="ACTIVECLASS" class="flex-col items-center">
        <h5 class="font-xl w-full text-left">{theme}</h5>
        <div class="grid grid-cols-8 w-full gap-1 h-8 bg-transparent" data-theme="{theme}">
          <div class="col-span-1 aspect-square rounded-md bg-primary block"></div>
          <div class="col-span-1 aspect-square rounded-md bg-secondary block"></div>
          <div class="col-span-1 aspect-square rounded-md bg-accent block"></div>
          <div class="col-span-1 aspect-square rounded-md bg-neutral block"></div>
          <div class="col-span-1 aspect-square rounded-md bg-base-100 block"></div>
          <div class="col-span-1 aspect-square rounded-md bg-base-200 block"></div>
          <div class="col-span-1 aspect-square rounded-md bg-base-300 block"></div>
          <div class="col-span-1 aspect-square rounded-md bg-base-content block"></div>
        </div>
      </button>
    </li>
    {/each}
  </ul>
</div>
  </div>
</div>


<div class="max-w-5xl mx-auto px-5">
  <slot />
</div>
