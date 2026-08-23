<script lang="ts">
  import { page } from '$app/state';
  import { docsHome, docSections, normalizeDocPath } from '$lib/docs/navigation';

  type DocPage = { title: string; href: string };
  type DocGroup = { title: string; items: readonly DocPage[] };
  type DocSection = { label: string; items: readonly (DocPage | DocGroup)[] };

  let { children } = $props();
  let mobileNavigationOpen = $state(false);
  let currentPath = $derived(normalizeDocPath(page.url.pathname));
  const navigationSections: readonly DocSection[] = docSections;

  const isDocPage = (item: DocPage | DocGroup): item is DocPage => 'href' in item;
</script>

{#snippet navigationLink(item: DocPage)}
  <a
    href={item.href}
    aria-current={currentPath === item.href ? 'page' : undefined}
    data-active={currentPath === item.href}
    onclick={() => (mobileNavigationOpen = false)}
    class="text-muted-foreground data-[active=true]:font-medium data-[active=true]:text-primary">
    {item.title}
  </a>
{/snippet}

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
    {#each navigationSections as section (section.label)}
      <section>
        <h2 class="mb-2 text-sm font-semibold">{section.label}</h2>
        <ul class="space-y-2 text-sm">
          {#each section.items as item (item.title)}
            <li>
              {#if isDocPage(item)}
                {@render navigationLink(item)}
              {:else}
                <span class="font-medium text-foreground">{item.title}</span>
                <ul class="mt-2 space-y-2 border-l pl-3">
                  {#each item.items as child (child.href)}
                    <li>{@render navigationLink(child)}</li>
                  {/each}
                </ul>
              {/if}
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
