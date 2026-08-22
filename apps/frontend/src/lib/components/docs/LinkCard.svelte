<script lang="ts">
  let { title, href, description }: { title: string; href: string; description: string } = $props();
</script>

<a class="docs-card" {href}>
  <strong>{title}<span aria-hidden="true"> →</span></strong>
  <span>{description}</span>
</a>
