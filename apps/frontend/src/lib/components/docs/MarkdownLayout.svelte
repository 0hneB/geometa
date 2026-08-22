<script lang="ts">
  import { page } from '$app/state';
  import logo from '$lib/assets/logo.png?enhanced';
  import { Button } from '$lib/components/ui/button';
  import { docPages, docSourceUrl, normalizeDocPath } from '$lib/docs/navigation';
  import type { Snippet } from 'svelte';

  type Heading = { depth: 2 | 3; id: string; title: string };
  type Hero = {
    title: string;
    tagline: string;
    actions: { text: string; link: string; variant?: 'primary' | 'minimal' }[];
  };

  let {
    children,
    title,
    description,
    headings = [],
    template,
    hero
  }: {
    children?: Snippet;
    title: string;
    description?: string;
    headings?: Heading[];
    template?: 'splash';
    hero?: Hero;
  } = $props();

  let currentPath = $derived(normalizeDocPath(page.url.pathname));
  let pageIndex = $derived(docPages.findIndex((item) => item.href === currentPath));
  let previousPage = $derived(pageIndex > 0 ? docPages[pageIndex - 1] : undefined);
  let nextPage = $derived(pageIndex >= 0 ? docPages[pageIndex + 1] : undefined);
</script>

<svelte:head>
  <title>{title} | Learnable Meta</title>
  {#if description}<meta name="description" content={description} />{/if}
</svelte:head>

<div class="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem]">
  <article class="prose docs-prose mx-auto w-full max-w-4xl px-6 py-10 lg:px-10">
    {#if template === 'splash' && hero}
      <div class="docs-hero">
        <enhanced:img src={logo} alt="Learnable Meta globe pin" />
        <div>
          <h1>{hero.title}</h1>
          <p>{hero.tagline}</p>
          <div class="flex flex-wrap gap-3">
            {#each hero.actions as action (action.link)}
              <Button
                href={action.link}
                variant={action.variant === 'primary' ? 'default' : 'outline'}>
                {action.text}
              </Button>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <h1>{title}</h1>
    {/if}

    {@render children?.()}

    <footer class="docs-page-footer">
      <a href={docSourceUrl(currentPath)} target="_blank" rel="noopener noreferrer">
        Edit this page on GitHub
      </a>
      <nav class="docs-pagination" aria-label="Documentation pages">
        {#if previousPage}
          <a href={previousPage.href} rel="prev">
            <span>Previous</span>
            <strong>{previousPage.title}</strong>
          </a>
        {/if}
        {#if nextPage}
          <a class="next" href={nextPage.href} rel="next">
            <span>Next</span>
            <strong>{nextPage.title}</strong>
          </a>
        {/if}
      </nav>
    </footer>
  </article>

  {#if headings.length}
    <aside class="hidden border-l xl:block">
      <nav class="sticky top-0 max-h-screen overflow-y-auto px-6 py-10" aria-label="On this page">
        <h2 class="mb-3 text-sm font-semibold">On this page</h2>
        <ul class="space-y-2 text-sm">
          {#each headings as heading (heading.id)}
            <li class:pl-3={heading.depth === 3}>
              <a class="text-muted-foreground" href={`#${heading.id}`}>{heading.title}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>
  {/if}
</div>
