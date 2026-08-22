<script lang="ts">
  import { page } from '$app/state';
  import { docsHome, docSections, normalizeDocPath } from '$lib/docs/navigation';

  let { children } = $props();
  let mobileNavigationOpen = $state(false);
  let currentPath = $derived(normalizeDocPath(page.url.pathname));
</script>

{#snippet navigation()}
  <nav class="space-y-6" aria-label="Documentation">
    <div>
      <a
        href={docsHome.href}
        aria-current={currentPath === docsHome.href ? 'page' : undefined}
        data-active={currentPath === docsHome.href}
        onclick={() => (mobileNavigationOpen = false)}
        class="font-semibold text-foreground data-[active=true]:text-primary">
        {docsHome.title}
      </a>
    </div>
    {#each docSections as section (section.label)}
      <section>
        <h2 class="mb-2 text-sm font-semibold">{section.label}</h2>
        <ul class="space-y-2 text-sm">
          {#each section.items as item (item.href)}
            <li>
              <a
                href={item.href}
                aria-current={currentPath === item.href ? 'page' : undefined}
                data-active={currentPath === item.href}
                onclick={() => (mobileNavigationOpen = false)}
                class="text-muted-foreground data-[active=true]:font-medium data-[active=true]:text-primary">
                {item.title}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </nav>
{/snippet}

<details bind:open={mobileNavigationOpen} class="border-b bg-muted/30 px-6 py-4 lg:hidden">
  <summary class="cursor-pointer font-semibold">Documentation menu</summary>
  <div class="pt-5">{@render navigation()}</div>
</details>

<div
  class="w-full lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] {currentPath === '/docs/api'
    ? 'lg:h-[calc(100dvh-3.25rem)] lg:overflow-hidden'
    : ''}">
  <aside class="hidden border-r bg-muted/30 lg:block">
    <div
      class="overflow-y-auto px-6 py-8 {currentPath === '/docs/api'
        ? 'h-full'
        : 'sticky top-13 max-h-[calc(100dvh-3.25rem)]'}">
      {@render navigation()}
    </div>
  </aside>
  <div class="min-w-0 {currentPath === '/docs/api' ? 'lg:h-full lg:overflow-hidden' : ''}">
    {@render children?.()}
  </div>
</div>
