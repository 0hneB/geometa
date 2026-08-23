<script lang="ts">
  import { page } from '$app/state';
  import MainNav from '$lib/components/nav/MainNav.svelte';
  import ModeSwitcher from '$lib/components/ModeSwitcher.svelte';
  import { Button } from '$lib/components/ui/button';
  import DiscordFillIcon from '~icons/mingcute/discord-fill';
  import GithubFillIcon from '~icons/mingcute/github-fill';
  import MobileNav from '$lib/components/nav/MobileNav.svelte';

  const navLinks = [
    {
      url: '/',
      name: 'Home'
    },
    {
      url: '/maps',
      name: 'Maps'
    },
    {
      url: '/docs',
      name: 'Documentation'
    },
    {
      url: '/map-making',
      name: 'Map-making'
    },
    {
      url: '/personal',
      name: 'Personal maps'
    }
  ];

  const headerIconButtonClass =
    'size-8 rounded-md px-0 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-white/35 data-[active=true]:bg-white/15 data-[active=true]:text-white';
</script>

<header
  class="w-full bg-gradient-to-r from-green-900 to-sky-900 px-2 py-0 sm:px-4 {page.url.pathname.startsWith(
    '/docs'
  )
    ? 'sticky top-0 z-50'
    : ''}">
  <div class="container-wrapper">
    <div class="container flex h-13 items-center gap-2 md:gap-4">
      <MainNav {navLinks} />
      <MobileNav {navLinks} />
      <div class="ml-auto flex flex-1 items-center gap-2 justify-end">
        <nav class="flex items-center gap-0.5">
          <Button
            variant="dark-ghost"
            size="icon"
            class={headerIconButtonClass}
            href="https://discord.gg/AcXEWznYZe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord">
            <DiscordFillIcon class="size-5 flex-shrink-0" />
          </Button>
          <Button
            variant="dark-ghost"
            size="icon"
            class={headerIconButtonClass}
            href="https://github.com/likeon/geometa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub">
            <GithubFillIcon class="size-5 flex-shrink-0" />
          </Button>
          <span class="mx-1 h-5 w-px bg-white/25" aria-hidden="true"></span>
          <ModeSwitcher />
        </nav>
      </div>
    </div>
  </div>
</header>
