<script lang="ts">
  import { onMount } from 'svelte';
  import { mode } from 'mode-watcher';
  import '@scalar/api-reference/style.css';

  type ScalarInstance = {
    destroy: () => void;
  };

  let loadFailed = $state(false);

  $effect(() => {
    const dark = mode.current === 'dark';
    document.body.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('light-mode', !dark);

    return () => document.body.classList.remove('dark-mode', 'light-mode');
  });

  onMount(() => {
    let scalarInstance: ScalarInstance | undefined;
    let active = true;

    import('@scalar/api-reference')
      .then(({ createApiReference }) => {
        if (!active) return;
        scalarInstance = createApiReference('#scalar-api-reference', {
          url: '/api/docs/json',
          forceDarkModeState: mode.current === 'dark' ? 'dark' : 'light',
          hideDarkModeToggle: true
        });
      })
      .catch(() => {
        if (active) loadFailed = true;
      });

    return () => {
      active = false;
      scalarInstance?.destroy();
    };
  });
</script>

<svelte:head>
  <title>API Documentation | Learnable Meta</title>
  <meta
    name="description"
    content="Explore the Learnable Meta API endpoints, schemas, and request examples." />
</svelte:head>

<div
  id="scalar-api-reference"
  class="min-h-[calc(100dvh-3.25rem)] lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain">
  {#if loadFailed}
    <div class="p-8">
      <h1 class="text-2xl font-bold">API documentation unavailable</h1>
      <p class="mt-3 text-muted-foreground">
        Scalar could not be loaded. You can still <a class="underline" href="/api/docs/json"
          >open the raw OpenAPI document</a
        >.
      </p>
    </div>
  {:else}
    <p class="p-8 text-muted-foreground">Loading API documentation…</p>
  {/if}
</div>

<style>
  #scalar-api-reference {
    --scalar-background-1: var(--background);
    --scalar-sidebar-background-1: var(--background);
  }

  :global(html:not(.dark) #scalar-api-reference .request-card.dark-mode) {
    color-scheme: light !important;
    --scalar-background-1: var(--background);
    --scalar-background-2: var(--muted);
    --scalar-background-3: var(--border);
    --scalar-color-1: var(--foreground);
    --scalar-color-2: var(--muted-foreground);
    --scalar-color-3: var(--muted-foreground);
    --scalar-border-color: var(--border);
  }

  @media (min-width: 64rem) {
    :global(#scalar-api-reference .references-layout) {
      --full-height: calc(100dvh - 3.25rem);
      min-height: calc(100dvh - 3.25rem);
    }
  }
</style>
