<script lang="ts">
  import { onMount } from 'svelte';
  import { mode } from 'mode-watcher';

  type ScalarConfiguration = {
    url: string;
    forceDarkModeState: 'dark' | 'light';
    hideDarkModeToggle: boolean;
  };

  type ScalarInstance = {
    destroy: () => void;
  };

  type ScalarWindow = Window & {
    Scalar?: {
      createApiReference: (selector: string, configuration: ScalarConfiguration) => ScalarInstance;
    };
  };

  let loadFailed = $state(false);

  $effect(() => {
    const dark = mode.current === 'dark';
    document.body.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('light-mode', !dark);

    return () => document.body.classList.remove('dark-mode', 'light-mode');
  });

  onMount(() => {
    const scalarWindow = window as ScalarWindow;
    let scalarInstance: ScalarInstance | undefined;
    let script = document.querySelector<HTMLScriptElement>('script[data-scalar-api-reference]');
    const render = () => {
      if (!scalarWindow.Scalar) {
        loadFailed = true;
        return;
      }
      scalarInstance = scalarWindow.Scalar.createApiReference('#scalar-api-reference', {
        url: '/api/docs/json',
        forceDarkModeState: mode.current === 'dark' ? 'dark' : 'light',
        hideDarkModeToggle: true
      });
    };
    const fail = () => (loadFailed = true);

    if (script) {
      if (scalarWindow.Scalar) render();
      else {
        script.addEventListener('load', render, { once: true });
        script.addEventListener('error', fail, { once: true });
      }
    } else {
      script = document.createElement('script');
      script.dataset.scalarApiReference = '';
      script.src =
        'https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest/dist/browser/standalone.min.js';
      script.crossOrigin = 'anonymous';
      script.addEventListener('load', render, { once: true });
      script.addEventListener('error', fail, { once: true });
      document.head.append(script);
    }

    return () => {
      scalarInstance?.destroy();
      script?.removeEventListener('load', render);
      script?.removeEventListener('error', fail);
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
