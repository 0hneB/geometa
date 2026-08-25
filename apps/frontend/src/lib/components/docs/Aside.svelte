<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    type = 'note',
    title
  }: {
    children?: Snippet;
    type?: 'note' | 'tip' | 'caution';
    title?: string;
  } = $props();

  const labels = { note: 'Note', tip: 'Tip', caution: 'Caution' };
</script>

<aside class="docs-callout" data-type={type}>
  <strong class="docs-callout-title">{title ?? labels[type]}</strong>
  <div>{@render children?.()}</div>
</aside>
