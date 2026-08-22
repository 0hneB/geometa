export type DocLink = {
  title: string;
  href: string;
};

export type DocSection = {
  label: string;
  items: readonly DocLink[];
};

export const docsHome = { title: 'Documentation home', href: '/docs' } as const;

export const docSections: readonly DocSection[] = [
  {
    label: 'Getting Started',
    items: [
      { title: 'Overview', href: '/docs/getting-started' },
      { title: 'Chrome and Chromium', href: '/docs/getting-started/chrome' },
      { title: 'Firefox', href: '/docs/getting-started/firefox' },
      { title: 'Android', href: '/docs/getting-started/android' },
      { title: 'iOS and iPadOS', href: '/docs/getting-started/ios' },
      { title: 'Personal Maps', href: '/docs/getting-started/personal-maps' }
    ]
  },
  {
    label: 'Map Creators',
    items: [
      { title: 'Getting started', href: '/docs/map-creators/getting-started' },
      { title: 'Map JSON and tags', href: '/docs/map-creators/map-format' },
      { title: 'GeoJSON map areas', href: '/docs/map-creators/geojson-overlays' },
      { title: 'Meta uploads', href: '/docs/map-creators/meta-uploads' }
    ]
  },
  {
    label: 'API Documentation',
    items: [{ title: 'API Reference', href: '/docs/api' }]
  },
  {
    label: 'Help',
    items: [
      { title: 'Troubleshooting', href: '/docs/troubleshooting' },
      { title: 'Reference', href: '/docs/reference' }
    ]
  }
] as const;

export const docPages = [
  docsHome,
  ...docSections.flatMap((section) => section.items.filter((item) => item.href.startsWith('/docs')))
];

export const normalizeDocPath = (pathname: string) => pathname.replace(/\/$/, '') || '/';

export const docSourceUrl = (href: string) => {
  const route = href === '/docs' ? '' : href.slice('/docs'.length);
  return `https://github.com/likeon/geometa/edit/main/apps/frontend/src/routes/(public)/docs${route}/+page.svx`;
};
